import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Upload, Spin, Icon } from 'antd';

import Avatar from 'components/avatar';
import { attachmentRequest } from 'actions/action_attachment';

import './style.scss';

const Profile = ({ user }) => {
  const { logoutUser } = useSelector(state => state.authUser);
  const { fileLoading } = useSelector(state => state.attachmentFile);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const getAttachment = useCallback(file => dispatch(attachmentRequest(file)), [dispatch]);

  const handleChange = info => {
    if (info.file.status === 'done') {
      getAttachment(info.file.originFileObj);
    }
  }

  if (logoutUser) {
    return <Redirect to='/login'/>
  }

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={classNames('peer-upload_avatar', {'invisibility':  fileLoading})}
      showUploadList={ false }
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={handleChange}
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
  )
};

Profile.propTypes = {
  user: PropTypes.object
}

export default Profile;