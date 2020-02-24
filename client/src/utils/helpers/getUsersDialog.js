export default (dialogs, userId) => {
  // eslint-disable-next-line
  return dialogs.find(item => {
    const { owner, interlocutor } = item;

    if (owner._id === userId || interlocutor._id === userId) {
      return item;
    }
  })
}