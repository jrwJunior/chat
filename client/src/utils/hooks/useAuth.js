import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuth = (isSubmitting, setSubmitting, history) => {
  const { isLoading, status } = useSelector(state => state.user_auth);

  useEffect(() => {
    if (isSubmitting && !isLoading) {
      setSubmitting(false);

      if (status === 'success') {
        history.push('/');
      }
    }
    // eslint-disable-next-line
  }, [isLoading, setSubmitting]);
}

export {
  useAuth
}