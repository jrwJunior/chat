import { Modifier, EditorState } from 'draft-js';
import emojiDecode from './emojiDecode';

export default (editorState, message) => {
  const replyText = message.match(/:(.+?):/g) ? emojiDecode(message) : message;

  let contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const contentStateWithEntity = contentState.createEntity('REPLY_TEXT','MUTABLE');
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  let newState;

  contentState = Modifier.insertText(
    contentState,
    selectionState,
    replyText,
    null,
    entityKey
  );

  newState = EditorState.push(
    editorState,
    contentState,
    'insert-characters'
  );

  // TODO: move fix range
  
  if (!newState.getCurrentContent().equals(editorState.getCurrentContent())) {
    const sel = newState.getSelection();
    const updatedSelection = sel.merge({
      anchorOffset: sel.getAnchorOffset(),
      focusOffset: sel.getAnchorOffset() + 1
    })

    newState = EditorState.forceSelection(
      newState,
      updatedSelection
    )
  }

  return newState;
}