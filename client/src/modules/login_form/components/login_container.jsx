import { withFormik } from 'formik';

import validateForm from 'utils/validate_form';
import Login from './login';

export default withFormik({
  mapPropsToValues: () => ({
     email: '',
     password: ''
  }),
  validate: values => validateForm({ values, path:'/login' }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'Login'
})(Login);