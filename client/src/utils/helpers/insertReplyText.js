import { Modifier, EditorState } from 'draft-js';
import emojiDecode from './emojiDecode';

export default (editorState, message) => {
  const replyText = message && message.match(/:(.+?):/g) ? emojiDecode(message) : message;

  let contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const contentStateWithEntity = contentState.createEntity('REPLY_TEXT','MUTABLE');
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  
  contentState = Modifier.insertText(contentState, selectionState, ' ');
  contentState = Modifier.insertText(
    contentState,
    selectionState,
    replyText,
    null,
    entityKey
  );

  let newState = EditorState.push(
    editorState,
    contentState,
    'insert-characters'
  );
  
  if (!newState.getCurrentContent().equals(editorState.getCurrentContent())) {
    const sel = newState.getSelection();
    const updatedSelection = sel.merge({
      anchorOffset: sel.getAnchorOffset() + 1,
      focusOffset: sel.getAnchorOffset() + 1
    })

    newState = EditorState.forceSelection(
      newState,
      updatedSelection
    )
  }

  return newState;
}