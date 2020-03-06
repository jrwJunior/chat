import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthentication = (isSubmitting, setSubmitting, history) => {
  const { isLoading, status } = useSelector(state => state.user_auth);

  useEffect(() => {
    if (isSubmitting && !isLoading) {
      setSubmitting(false);
    }

    if (status === 'success') {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [isLoading, status, setSubmitting]);
}

export {
  useAuthentication
}