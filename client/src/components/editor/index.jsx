import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import Editor, { createEditorStateWithText  } from 'draft-js-plugins-editor';
import createEmojiMartPlugin from 'draft-js-emoji-mart-plugin';
import data from 'emoji-mart/data/messenger.json';

import EmojiPanel from 'components/emoji_panel';
import EditorButton from 'components/buttons/editorButton';
import ReplyMessage from 'components/reply_message';

import { createdMessage } from 'actions/action_messages';
import { emojiEncode } from 'utils/helpers';
import { socket } from 'utils/socket';
import { socketEvents } from 'constans/socketEvents';

import './style.scss';

const emojiPlugin = createEmojiMartPlugin({
  data,
  set: 'messenger'
});

const { Picker } = emojiPlugin;

const SendPanel = ({ userId }) => {
  const [editorState, setEditorState] = useState(createEditorStateWithText(''));

  const { dialogId } = useSelector(state => state.dialog);
  const dispatch = useDispatch();

  const addMessage = useCallback((message, dialogId, interlocutor) => dispatch(createdMessage(message, dialogId, interlocutor)), [dispatch]);
  const handleSubmit = useCallback(evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const messageEncode = emojiEncode(editorState.getCurrentContent().getPlainText('\u0001'));

    addMessage(messageEncode, dialogId, userId);
    setEditorState(createEditorStateWithText(''));
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

  return (
    <div className='editor'>
      <ReplyMessage/>
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