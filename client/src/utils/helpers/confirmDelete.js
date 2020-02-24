import { Modal } from 'antd';

const { confirm } = Modal;

export default (removeMessage, messageId) => {
  confirm({
    title: 'Remove for everyone',
    content: 'Are you sure you want to delete 1 message?',
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk() {
      removeMessage(messageId)
    }
  })
}