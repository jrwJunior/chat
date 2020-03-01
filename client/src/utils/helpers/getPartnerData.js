export default ({interlocutor, owner, userData}) => {
  const users = [interlocutor, owner];
  // eslint-disable-next-line
  return users.find(user => {
    if (user._id.indexOf(userData._id) < 0) {
      return user;
    }
  });
};