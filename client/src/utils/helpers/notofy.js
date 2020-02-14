import { notification } from 'antd';

export default ({type}) => {
  notification[type]({
    message: 'Success',
    description: 'You have successfully logged in',
  });
}