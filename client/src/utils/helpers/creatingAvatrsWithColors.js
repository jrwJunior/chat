export default (text = '') => {
  const colors = ["#3bd4d8", "#ff8e51", "#ff83ca", "#ECD074", "#da8cf7", "#42bcfd", "#E57979"];
  const charCodes = text
    .split('')
    .map(char => char.charCodeAt(0))
    .join('');

  return {
    color: colors[parseInt(charCodes, 10) % colors.length]
  }
}