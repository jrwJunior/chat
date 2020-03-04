import emojiDict from 'emoji-dictionary';

const getFromBetween = {
  results: [],
  string: "",
  getFromBetween(sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    const sp = this.string.indexOf(sub1) + sub1.length;
    const string1 = this.string.substr(0, sp);
    const string2 = this.string.substr(sp);
    const tp = string1.length + string2.indexOf(sub2);
    const response = this.string.substring(sp, tp);
    this.string = this.string.substr(tp);
    return response;
  },
  removeFromBetween(sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0)
      return false;
    const removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
    this.string = this.string.replace(removal, "");
  },
  getAllResults(sub1, sub2) {
    if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

    const result = this.getFromBetween(sub1, sub2);

    if(result.indexOf(' ') < 0) {
      this.results.push(result);
    }

    if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1 && ((this.string.split(sub1).length - 1) > 1)) {
      this.getAllResults(sub1, sub2);
    } else return;
  },
  get(string, sub1, sub2) {
    if((string.split(sub1).length - 1) <= 1)
      return [];

    this.results = [];
    this.string = string;
    this.getAllResults(sub1, sub2);
    return this.results;
  }
};

const decode = input => {
  let output = input.toString();

  const result = getFromBetween.get(input, ":", ":");
  result.forEach(textEmoji => {
    const emojiEquivalent = emojiDict.getUnicode(textEmoji);
    if (emojiEquivalent)
      output = output.replace(`:${textEmoji}:`, emojiEquivalent);
  });

  return output;
};

export default decode;