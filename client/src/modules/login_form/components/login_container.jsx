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
    const { userLogin, setInitialState } = props;
    
    setInitialState();
    userLogin(values);
  },
  displayName: 'Login'
})(Login);

const mapDispatchToProps = dispatch => {
  return {
    userLogin: values => dispatch(login(values)),
    setInitialState: () => dispatch(clearError())
  }
}

export default connect(
  null,
  mapDispatchToProps)(HocFormik);