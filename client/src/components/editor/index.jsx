import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getDefaultKeyBinding, KeyBindingUtil, EditorState, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiMartPlugin from 'draft-js-emoji-mart-plugin';
import data from 'emoji-mart/data/messenger.json';

import EmojiPanel from 'components/emoji_panel';
import EditorButton from 'components/buttons/editorButton';
import ReplyMessage from 'components/edit_message';

import { createdMessage } from 'actions/action_messages';
import { saveMessage } from 'actions/action_editMessage';
import { emojiEncode, insertReplyText } from 'utils/helpers';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import './style.scss';

const emojiPlugin = createEmojiMartPlugin({
  data,
  set: 'messenger'
});

const { Picker } = emojiPlugin;

const SendPanel = React.forwardRef(({ userId }, ref) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { dialogId } = useSelector(state => state.dialog);
  const { message, isOpenPanel } = useSelector(state => state.replyMessage);

  const dispatch = useDispatch();

  const addMessage = useCallback((message, dialogId, interlocutor) => dispatch(createdMessage(message, dialogId, interlocutor)), [dispatch]);
  const setSaveMessage = useCallback(message => dispatch(saveMessage(message)), [dispatch]);
  const handleSubmit = useCallback(evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const messageEncode = emojiEncode(editorState.getCurrentContent().getPlainText('\u0001'));
    const clearEditorState = EditorState.push(editorState, ContentState.createFromText(''));

    addMessage(messageEncode, dialogId, userId);
    setEditorState(clearEditorState);
  }, [addMessage, editorState, userId, dialogId]);

  const myKeyBindingFn = evt => {
    const { hasCommandModifier } = KeyBindingUtil;
    
    if (evt.shiftKey || evt.altKey || evt.ctrlKey) {
      return;
    }
    
    socket.emit(socketEvents.TYPING_MESSAGE, { typing: true });

    if (!evt.shiftKey && evt.key === 'Enter' && !hasCommandModifier(evt)) {
      return 'myeditor-save';
    }

    return getDefaultKeyBinding(evt);
  }

  const handleKeyCommand = command => {
    if (command === 'myeditor-save') {
      handleSubmit();
      return 'handled';
    }
    return 'not-handled';
  }

  const handleClearEditorState = () => {
    const clearEditorState = EditorState.push(editorState, ContentState.createFromText(''), 'remove-range');
    setEditorState(clearEditorState);
  }

  const handleSave = () => {
    const message = emojiEncode(editorState.getCurrentContent().getPlainText());
    
    setSaveMessage(message);
    handleClearEditorState();
  }

  useEffect(() => {
    if (isOpenPanel) {
      const newEditorState = insertReplyText(editorState, message);
      setEditorState(newEditorState);
    }
    // eslint-disable-next-line
  }, [message, isOpenPanel]);

  // TODO: fixed edit message

  return (
    <div className='editor' ref={ ref } style={{ boxShadow: isOpenPanel ? '0 0 0 1px #ECECEC' : false }}>
      { isOpenPanel ? (
        <ReplyMessage
          clearEditorState={ handleClearEditorState }
          replyMessage={ message }
        />
      ) : null }
      <div className='editor-wrap'>
        <div className='editor-inner'>
          <Editor 
            editorState={ editorState }
            onChange={ setEditorState }
            handleKeyCommand={ handleKeyCommand }
            keyBindingFn={ myKeyBindingFn }
            plugins={ [emojiPlugin] }
            placeholder='Type a message...'
          />
          <EmojiPanel Picker={ Picker } />
        </div>
        { !isOpenPanel ? (
          <EditorButton onClick={ handleSubmit } />
        ) : (
          <button onClick={ handleSave } className='edit-message' type='button'>
            <span className='icon-tick'/>
          </button>
        )}
      </div>
    </div>
  )
});

SendPanel.propTypes = {
  userId: PropTypes.string
}

export default SendPanel;