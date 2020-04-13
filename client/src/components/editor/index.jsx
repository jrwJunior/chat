import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { saveMessage, closeReplyMessage } from 'actions/action_editMessage';
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
  const { message, author, showReply, editing } = useSelector(state => state.replyMessage);
  const refEditor = useRef();

  const dispatch = useDispatch();

  const addMessage = useCallback((message, user, author, replyMessage) => dispatch(createdMessage(message, user, author, replyMessage)), [dispatch]);
  const setCloseReplyMessage = useCallback(() => dispatch(closeReplyMessage()), [dispatch]);
  const setSaveMessage = useCallback(message => dispatch(saveMessage(message)), [dispatch]);
  const handleSubmit = useCallback(evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    if (showReply) {
      setCloseReplyMessage();
    }

    const messageEncode = emojiEncode(editorState.getCurrentContent().getPlainText('\u0001'));
    const clearEditorState = EditorState.push(editorState, ContentState.createFromText(''));

    addMessage(messageEncode, userId, author, message);
    setEditorState(clearEditorState);
    // eslint-disable-next-line
  }, [addMessage, editorState, userId, message, author]);

  const myKeyBindingFn = evt => {
    const { hasCommandModifier } = KeyBindingUtil;
    
    if (evt.shiftKey || evt.altKey || evt.ctrlKey) {
      return;
    }

    if (!evt.shiftKey && evt.key === 'Enter' && !hasCommandModifier(evt)) {
      return 'myeditor-save';
    }

    if (!evt.shiftKey && showReply && evt.key === 'Enter' && !hasCommandModifier(evt)) {
      return 'edited-save';
    }

    socket.emit(socketEvents.TYPING_MESSAGE, { typing: true });

    return getDefaultKeyBinding(evt);
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

  const handleKeyCommand = command => {
    if (command === 'edited-save') {
      handleSave();
      return 'handled';
    }

    if (command === 'myeditor-save') {
      handleSubmit();
      return 'handled';
    }
    return 'not-handled';
  }

  useEffect(() => {
    if (showReply) {
      const newEditorState = insertReplyText(editorState, !editing ? '' : message);
      setEditorState(newEditorState);
      !editing && refEditor.current.focus();
    }
    // eslint-disable-next-line
  }, [message, showReply]);

  // TODO: fixed edit message

  return (
    <div className='editor' ref={ ref } style={{ boxShadow: showReply ? '0 0 0 1px #ECECEC' : false }}>
      { showReply ? (
        <ReplyMessage
          clearEditorState={ handleClearEditorState }
          author={ author }
          text={ message }
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
            ref={ refEditor }
          />
          <EmojiPanel Picker={ Picker } />
        </div>
        { !editing ? (
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