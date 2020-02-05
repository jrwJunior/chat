import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { createAccount } from 'actions/action_auth';
import validateForm from 'utils/validate_form';
import Register from './register';

const Container = withFormik({
  mapPropsToValues: () => ({
     email: '',
     password: '',
     firstName: '',
     surname: ''
  }),
  validate: values => validateForm({ values, path: '/register' }),

  handleSubmit: (values, { props }) => {
    props.userRegister(values);
  },

  displayName: 'Register'
})(Register);

const mapDispatchToProps = dispatch => {
  return {
    userRegister: values => dispatch(createAccount(values))
  }
}

export default connect(
  null,
  mapDispatchToProps)(Container);