import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getDefaultKeyBinding, KeyBindingUtil, EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiMartPlugin from 'draft-js-emoji-mart-plugin';
import data from 'emoji-mart/data/messenger.json';

import EmojiPanel from 'components/emoji_panel';
import EditorButton from 'components/buttons/editorButton';
import ReplyMessage from 'components/reply_message';

import { createdMessage } from 'actions/action_messages';
import { emojiEncode, insertReplyText } from 'utils/helpers';
import { usePrevious } from 'utils/hooks';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import './style.scss';

const emojiPlugin = createEmojiMartPlugin({
  data,
  set: 'messenger'
});

const { Picker } = emojiPlugin;

const SendPanel = ({ userId }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { dialogId } = useSelector(state => state.dialog);
  const { replyMessage, isOpen } = useSelector(state => state.replyMessage);
  const prevProps = usePrevious(isOpen);
  const dispatch = useDispatch();

  const addMessage = useCallback((message, dialogId, interlocutor) => dispatch(createdMessage(message, dialogId, interlocutor)), [dispatch]);
  const handleSubmit = useCallback(evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const messageEncode = emojiEncode(editorState.getCurrentContent().getPlainText('\u0001'));

    addMessage(messageEncode, dialogId, userId);
    setEditorState(EditorState.createEmpty());
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

  useEffect(() => {
    if (!!prevProps !== isOpen && !isOpen) {
      setEditorState(EditorState.createEmpty());
    }

    if (isOpen) {
      const newEditorState = insertReplyText(editorState, replyMessage);
      setEditorState(newEditorState);
    }
    // eslint-disable-next-line
  }, [isOpen, replyMessage]);

  return (
    <div className='editor'>
      { isOpen ? (
        <ReplyMessage
          replyMessage={ replyMessage }
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
        <EditorButton onClick={ handleSubmit } />
      </div>
    </div>
  )
};

SendPanel.propTypes = {
  userId: PropTypes.string
}

export default SendPanel;