import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import Editor, { createEditorStateWithText  } from 'draft-js-plugins-editor';
import createEmojiMartPlugin from 'draft-js-emoji-mart-plugin';
import data from 'emoji-mart/data/messenger.json';

import EmojiPanel from 'components/emoji_panel';
import EditorButton from 'components/buttons/editorButton';
import { createdMessage } from 'actions/action_messages';
import { getUsersDialog, emojiEncode } from 'utils/helpers';
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

  const { dialogs } = useSelector(state => state.chat_dialogs);
  const dispatch = useDispatch();

  const addMessage = useCallback((message, dialogId, interlocutor) => dispatch(createdMessage(message, dialogId, interlocutor)), [dispatch]);
  const handleSubmit = useCallback(evt => {
    if (evt && evt.preventDefault) {
      evt.preventDefault();
    }

    const dialog = getUsersDialog(dialogs, userId) || {};
    const messageEncode = emojiEncode(editorState.getCurrentContent().getPlainText('\u0001'));

    addMessage(messageEncode, dialog._id, userId);
    setEditorState(createEditorStateWithText(''));
  }, [addMessage, editorState, userId, dialogs]);

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
      <div className='editor-inner'>
        <Editor 
          editorState={ editorState }
          onChange={ setEditorState }
          handleKeyCommand={ handleKeyCommand }
          keyBindingFn={ myKeyBindingFn }
          onKeyUp={ () => console.log('keypress') }
          plugins={ [emojiPlugin] }
          placeholder='Type a message...'
        />
        <EmojiPanel Picker={ Picker } />
      </div>
      <EditorButton onClick={ handleSubmit } />
    </div>
  )
};

export default SendPanel;