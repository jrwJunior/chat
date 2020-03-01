import { Modal } from 'antd';

const { confirm } = Modal;

export default ({
  removeMessage,
  deleteMessage, 
  dialogId, 
  count = '1'
}) => {
  confirm({
    title: 'Remove for everyone',
    content: `Are you sure you want to delete ${ count } message?`,
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk() {
      removeMessage(deleteMessage, dialogId);
    }
  })
}