import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthentication = ({submitting, history, isSubmitting}) => {
  const { status } = useSelector(state => state.authUser);

  useEffect(() => {
    if (status === 'success') {
      history.push('/im');
    } else if (status === 'error' && isSubmitting) {
      submitting(false);
    }
  });
}

export {
  useAuthentication
}