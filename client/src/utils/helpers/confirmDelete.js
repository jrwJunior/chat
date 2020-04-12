import { Modal } from 'antd';

const { confirm } = Modal;

export default ({
  onCallback,
  content,
  data,
  okText
}) => {

  confirm({
    content,
    okText,
    icon: null,
    okType: 'danger',
    cancelText: 'Cancel',
    cancelButtonProps: {className: 'btn-cancel'},
    okButtonProps: {className: 'btn-del'},
    onOk() {
      onCallback(data);
    }
  })
}