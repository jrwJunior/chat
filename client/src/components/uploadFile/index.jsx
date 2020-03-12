import React from 'react';
import { Upload } from 'antd';

import './style.scss';

const UploadFile = () => {
  const uploadButton = (
    <div className="foo"/>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={ false }
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={evt => console.log(evt)}
    >
      {uploadButton}
    </Upload>
  );
};

export default UploadFile;