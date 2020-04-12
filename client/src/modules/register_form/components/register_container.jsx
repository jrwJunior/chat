import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { createAccount, clearError } from 'actions/action_auth';
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
    const { createUser, clearErrorData } = props;

    clearErrorData();
    createUser(values);
  },

  displayName: 'Register'
})(Register);

const mapDispatchToProps = dispatch => {
  return {
    createUser: values => dispatch(createAccount(values)),
    clearErrorData: () => dispatch(clearError())
  }
}

export default connect(
  null,
  mapDispatchToProps)(Container);