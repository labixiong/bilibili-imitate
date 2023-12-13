import SparkMD5 from 'spark-md5';

interface HashFile{
  file: File,           // 上传的文件
  chunkSize: number;    // 文件的切片大小
}

/**
 * 获取文件hash值
 */
const w: any = window
const blobSlice = w.File.prototype.slice || w.File.prototype.mozSlice || w.File.prototype.webkitSlice;

export async function hashFile({file, chunkSize}: HashFile){
  return new Promise((resolve, reject) => { 
    let currentChunk = 0;
    const chunks = Math.ceil(file.size / chunkSize);
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    function loadNext() {
      const start = currentChunk * chunkSize;
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }
    fileReader.onload = (e: any) => {
      spark.append(e.target.result); // Append array buffer
      currentChunk += 1;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log('finished loading');
        const result = spark.end();
        // 如果单纯的使用result 作为hash值的时候, 如果文件内容相同，而名称不同的时候
        // 想保留两个文件无法保留。所以把文件名称加上。
        const sparkMd5 = new SparkMD5();
        sparkMd5.append(result);
        sparkMd5.append(file.name);
        const hexHash: string = sparkMd5.end();
        resolve(hexHash);
      }
    };
    fileReader.onerror = () => {
      console.warn('文件读取失败！');
    };
    loadNext();
  }).catch(err => {
      console.log(err);
  });
}