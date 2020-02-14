export default (dialog, userId) => {
  // eslint-disable-next-line
  return dialog.find(item => {
    const { owner, interlocutor } = item;

    if (owner._id === userId || interlocutor._id === userId) {
      return item;
    }
  })
}