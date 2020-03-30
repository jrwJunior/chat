import { Modal } from 'antd';

const { confirm } = Modal;

export default ({
  onDelete,
  deleted,
  count = '1'
}) => {

  confirm({
    title: 'Remove for everyone',
    content: `Are you sure you want to delete ${ count } message?`,
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    cancelButtonProps: {className: 'btn-cancel'},
    okButtonProps: {className: 'btn-del'},
    onOk() {
      onDelete(deleted);
    }
  })
}