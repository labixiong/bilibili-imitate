import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload, Button, Progress } from 'antd';
import { checkHashApi, postVideoMergeApi, postVideoApi } from '../../api/file'
import { hashFile } from '../../utils/file'
import { AxiosProgressEvent } from 'axios';
// import axios from 'axios'

const { Dragger } = Upload
let totalNum: number = 0
// 停止操作
let stop: boolean = false;
const w: any = window
const blobSlice = w.File.prototype.slice || w.File.prototype.mozSlice || w.File.prototype.webkitSlice;

interface ChunksMerge {
  blockCount: number,   // 文件的切片数量
  chunkSize: number,    // 文件的切片大小
  hash: string,         // 文件的哈希值
  name: string,         // 文件名字
}

interface ChunksUpload {
  blockCount: number,   // 文件的切片数量
  chunkSize: number,    // 文件的切片大小
  hash: string,         // 文件的哈希值
  file: File,           // 上传的文件
  num: number,          // 上传的第几个切片
}

export default function PostVideo(props: { [propName: string]: any }) {

  const acceptFiles = ['.mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv,.m4v']
  const [num, setNum] = useState(0);
  const [fileList, setFileList]: any = useState([]);
  // 切片大小
  const [chunkSize, ]= useState(2 * 1024 * 1024);
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  async function chunksUpload({blockCount, chunkSize, hash, file, num}: ChunksUpload){
  
    let bool:boolean=true;
    for (let i = num; i < blockCount; i++) {
      if(stop){
        return;
      }
      const start = i * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      // 构建表单
      const form = new FormData();
      form.append('file', blobSlice.call(file, start, end));
      form.append('name', file.name);
      form.append('total', blockCount.toString());
      form.append('index', i.toString());
      form.append('chunkSize', file.size.toString());
      form.append('hash', hash);
      // ajax提交 分片，此时 content-type 为 multipart/form-data
      const axiosOptions = {
        // 文件上传成功的处理
        onUploadProgress: (e: AxiosProgressEvent) => {
          // 处理上传的进度
          console.log(blockCount, i, '上传进度');
          setNum(num + 1)
        },
      };

      const res = await postVideoApi(form, axiosOptions.onUploadProgress)
      console.log(res, 'res');
      

      // let res = await axios.post('http://192.168.15.210:7001/chunks_upload', form, axiosOptions.onUploadProgress);
      if(res.data.code !== 0){
        bool = false;
      }
    }
    // 请求切片合并数据
    const data = {
      chunkSize: file.size,
      name: file.name,
      blockCount,
      hash
    };
    if(bool){
      chunksMerge(data);
    }
  }

  function chunksMerge({ chunkSize, name, blockCount, hash }: ChunksMerge) {
    postVideoMergeApi({ chunkSize, name, total: blockCount, hash }).then(res => {
      console.log('上传成功');
    }).catch(err => {
      console.log(err);
    })
  }

  // 开始上传
  async function handleStartUpload() {
    setNum(0);
    const file: File = fileList[0];
    stop = false
    if (!file) {
      alert('没有获取文件');
      return;
    }

    // 组装数据
    // 文件切片数量
    const blockCount = Math.ceil(file.size / chunkSize);
    totalNum = blockCount;
    // 文件哈希值
    const hash: any = await hashFile({file, chunkSize});
    // 先检查是否上传过
    const checkForm = new FormData();
    checkForm.append('total', blockCount.toString());
    checkForm.append('hash', hash);
    checkForm.append('chunkSize', file.size.toString());
    checkForm.append('name', file.name);

    // 检查文件是否上传过
    const res = await checkHashApi(checkForm)
    
    const type = res.data.data.type;
    if(type === 0){
      // 存在了
      console.log("存在了");
      // mutate('num', blockCount );
      setNum(blockCount)
      return;
    } else if(type === 1) {
      // 切片上传完毕，没有合并
       const data = {
        chunkSize: file.size,
        name: file.name,
        blockCount: blockCount,
        hash
      };
      chunksMerge(data);
      // mutate('num', blockCount );
      setNum(blockCount)
      console.log("切片上传完毕，没有合并");
      return;
    } else if (type === 2){
      // 检查成功，需要断点续传
      const sum: number = res.data.data.index.length;
      console.log("sum", sum);
      
      // mutate('num', sum );
      setNum(sum)
      console.log("上次上传没有完成");
      chunksUpload({blockCount, chunkSize, file, hash, num: sum});

    } else if (type === 3){
      console.log("没有上传过");
      chunksUpload({blockCount, chunkSize, file, hash, num: 0});
    }
  }

  return (
    <div className='post-video-container'>
      <Dragger {...uploadProps} accept={acceptFiles.toString()}>
        <Button icon={<UploadOutlined />} size='large'>选择文件</Button>
      </Dragger>
      <Progress percent={parseInt(`${(num / totalNum) * 100}`)} />
      <Button
        type="primary"
        onClick={handleStartUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        开始上传
      </Button>
    </div>
  )
}
