import React, { useState, useEffect, useRef } from 'react';

import EmojiButton from 'components/buttons/emojiButton';
import './style.scss';
import 'emoji-mart/css/emoji-mart.css';

const icons = {
  categories: {
    recent: () => <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tac/1/16/1f554.png" alt=""/>,
    foods: () => <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t2a/1/16/1f354.png" alt=""/>,
    people: () => <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t51/1/16/1f603.png" alt=""/>,
    nature: () => <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/t5b/1/16/1f43b.png" alt=""/>
  }
}

export default ({ Picker }) => {
  const [showEmoji, setPickerEmoji] = useState(false);
  const node = useRef();

  const handleClickOutside = evt => {
    if ( node.current && node.current.contains(evt.target)) {
      return;
    }

    setPickerEmoji(false);
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showEmoji]);

  return (
    <>
     { showEmoji && (
      <div ref={node}>
        <Picker
          icons={ icons }
          set='messenger'
          exclude={['flags','symbols','objects','places','activity']}
          showPreview={false}
          showSkinTones={false}
          emojiSize={32}
          sheetSize={64}
          perLine={ 6 } 
        />
        <div className='composer_emoji_tooltip_tail'>
          <i className='icon-tooltip-tail'/>
        </div>
      </div>
    )}
      <EmojiButton
        onClick={ () => setPickerEmoji(() => !showEmoji) }
      />
    </>
  )
}