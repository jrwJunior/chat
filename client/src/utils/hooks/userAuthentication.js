import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthentication = (setSubmitting, history) => {
  const { status } = useSelector(state => state.user_auth);

  useEffect(() => {
    if (status === 'success') {
      history.push('/');
      setSubmitting(false);
    } else if (status === 'error') {
      setSubmitting(false);
    }
    // eslint-disable-next-line
  }, [status]);
}

export {
  useAuthentication
}