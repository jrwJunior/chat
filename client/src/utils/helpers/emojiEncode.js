import emojiDict from 'emoji-dictionary';
import emojiRegex from 'emoji-regex';

export default input => {
  const regex = emojiRegex();
  let output = input.toString();
  let match;

  while((match = regex.exec(output))) {
    let emoji = match[0];
    const emojiName = emojiDict.getName(emoji);

    const a = output.substring(0, match.index);
    const b = output.substring(match.index + emoji.length);
    output = `${a}:${emojiName}:${b}`;
  }

  return output;
}