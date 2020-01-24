export default ({ values, path }) => {
  let errors = {};
  const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regExpPassword = /^(?=.*[a-z])(?=.*\d).{6,}$/;
  
  Object.keys(values)
  .forEach(name => !values[name] && (errors[name] = 'Required'));
  
  switch(path) {
    case '/login':
      if (!values.password) {
        errors.password = 'Required';
      }
      break;
    case '/register':
      if (values.password && !regExpPassword.test(values.password)) {
        errors.password = 'Password must contain letters and numbers';
      }
      break;
    default:
      break;
  }

  if (values.email && !regExpEmail.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}