import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { login, clearError } from 'actions/action_auth';
import validateForm from 'utils/validate_form';
import Login from './login';

const HocFormik = withFormik({
  mapPropsToValues: () => ({
     email: '',
     password: ''
  }),
  validate: values => validateForm({ values, path:'/login' }),
  handleSubmit: (values, { props }) => {
    const { userLogin, clearErrorData } = props;

    clearErrorData();
    userLogin(values);
  },
  displayName: 'Login'
})(Login);

const mapDispatchToProps = dispatch => {
  return {
    userLogin: values => dispatch(login(values)),
    clearErrorData: () => dispatch(clearError())
  }
}

export default connect(
  null,
  mapDispatchToProps)(HocFormik);