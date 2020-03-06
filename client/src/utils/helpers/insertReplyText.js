import { Modifier, EditorState } from 'draft-js';
import emojiDecode from './emojiDecode';

export default (editorState, message) => {
  const replyText = message && message.match(/:(.+?):/g) ? emojiDecode(message) : message;

  let contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const contentStateWithEntity = contentState.createEntity('REPLY_TEXT','IMMUTABLE', { emojiUnicode: replyText });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  let emojiAddedContent;
  let emojiEndPos = 0;
  let blockSize = 0;

  const afterRemovalContentState = Modifier.removeRange(
    contentState,
    selectionState,
    'backward',
  );
  
  const targetSelection = afterRemovalContentState.getSelectionAfter();

  emojiAddedContent = Modifier.insertText(
    contentState,
    selectionState,
    replyText,
    null,
    entityKey
  );
  // contentState = Modifier.insertText(contentState, selectionState, ' ');

  emojiEndPos = targetSelection.getAnchorOffset();
  const blockKey = targetSelection.getAnchorKey();
  blockSize = contentState.getBlockForKey(blockKey).getLength();

  // let newState = EditorState.push(
  //   editorState,
  //   contentState,
  //   'insert-characters'
  // );

  if (emojiEndPos === blockSize) {
    emojiAddedContent = Modifier.insertText(
      emojiAddedContent,
      emojiAddedContent.getSelectionAfter(),
      ' ',
    );
  }

  let newState = EditorState.push(
    editorState,
    emojiAddedContent,
    'insert-characters'
  );

  return EditorState.forceSelection(
    newState,
    emojiAddedContent.getSelectionAfter()
  )
  
  // if (!newState.getCurrentContent().equals(editorState.getCurrentContent())) {
  //   const sel = newState.getSelection();
  //   const updatedSelection = sel.merge({
  //     anchorOffset: sel.getAnchorOffset(),
  //     focusOffset: sel.getAnchorOffset() + 2
  //   })

  //   newState = EditorState.forceSelection(
  //     newState,
  //     updatedSelection
  //   )
  // }

  // return newState;
}