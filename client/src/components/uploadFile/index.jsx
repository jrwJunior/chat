import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Upload, message, Spin, Icon } from 'antd';

import { attachment } from 'actions/action_attachment';
import './style.scss';

const UploadFile = () => {
  const [state, setState] = useState({
    loading: false,
    url: null
  });

  const dispatch = useDispatch();
  const setAttachment = useCallback(file => dispatch(attachment(file)), [dispatch]);

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setState({...state,loading: true});
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, url => {
        setState({url, loading: false})
      });
      
      setAttachment(info.file.originFileObj);
    }
  }

  const uploadButton = (
    state.loading ? <Spin indicator={ antIcon }/> : <div className="upload-icon"/>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={classNames(
        'avatar-uploader', 
        { 
          'invisibility':  state.loading,
          'uploaded': !!state.url
        }
      )}
      showUploadList={ false }
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={ handleChange }
      beforeUpload={ beforeUpload }
    >
      {!state.url ? uploadButton : <img src={state.url} alt="avatar" style={{objectFit: 'cover'}} />}
    </Upload>
  );
};

export default UploadFile;