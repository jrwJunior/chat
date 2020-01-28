import { withFormik } from 'formik';

import validateForm from 'utils/validate_form';
import Register from './register';

export default withFormik({
  mapPropsToValues: () => ({
     email: '',
     password: '',
     firstName: '',
     surname: ''
  }),
  validate: values => validateForm({ values, path: '/register' }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: 'Register'
})(Register);