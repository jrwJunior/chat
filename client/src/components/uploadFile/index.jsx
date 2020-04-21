import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Upload, message, Spin, Icon } from 'antd';

import Avatar from 'components/avatar';
import { attachmentRequest } from 'actions/action_attachment';

import './style.scss';

const UploadFile = ({user}) => {
  const { fileLoading } = useSelector(state => state.attachmentFile);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const getAttachment = useCallback(file => dispatch(attachmentRequest(file)), [dispatch]);

  const handleChange = info => {
    if (info.file.status === 'done') {
      getAttachment(info.file.originFileObj);
    }
  }

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={classNames('peer-upload_avatar', {'invisibility':  fileLoading})}
      showUploadList={ false }
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={ beforeUpload }
      onChange={ handleChange }
    >
      { fileLoading ? (
        <Spin indicator={ antIcon }/>
      ) : (
        <Avatar
          userName={ user.firstName }
          avatar={ user.avatar }
          size={ 40 }
        />
      )}
    </Upload>
  );
};

UploadFile.propTypes = {
  user: PropTypes.object
}

export default UploadFile;