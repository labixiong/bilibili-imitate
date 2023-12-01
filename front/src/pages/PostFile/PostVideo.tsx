import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

export default function PostVideo(props: UploadProps | { [propName: string]: any }) {

  const acceptFiles = ['.mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v']

  function handleBeforeUpload(file: File) {
    console.log(file);
  }

  return (
    <div>
      <Dragger {...props} accept={acceptFiles.toString()} beforeUpload={handleBeforeUpload}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
    </div>
  )
}
