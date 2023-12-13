const jwt = require("jsonwebtoken");
const md5 = require("md5");
const multer = require("multer");
const fs = require('fs')
const path = require('path')

// 格式化要响应的数据
module.exports.formatResponse = function (code, msg, data) {
  return {
    code,
    msg,
    data,
  };
};

module.exports.randomAvatar = async function () {
  const files = await readDirLength("./public/static/avatar");
  const randomIndex = Math.floor(Math.random() * files.length);
  return "/static/avatar/" + files[randomIndex];
};

// 解析客户端传递过来的 token
module.exports.analysisToken = function (token) {
  return jwt.verify(
    token.split(" ")[1],
    md5(process.env.JWT_SECRET),
    function (err, decode) {
      return decode;
    }
  );
};

// 文件上传
// module.exports.uploading = multer({
//   storage: storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//     files: 1,
//   },
// });


// 合并文件
module.exports.streamMerge = function (sourceFileDirectory, targetFile) {
  const scripts =  fs.readdirSync(path.resolve(__dirname, sourceFileDirectory)); // 获取源文件目录下的所有文件
  const fileWriteStream = fs.createWriteStream(path.resolve(__dirname, targetFile)); // 创建一个可写流
 
  // fs.readdir 读取出来的结果，根据具体的规则做下排序，防止因为顺序不对导致最终合并之后的文件无效。
  
  return streamMergeRecursive(scripts, fileWriteStream, sourceFileDirectory);
}

function streamMergeRecursive(scripts, fileWriteStream, sourceFileDirectory) {
  // 递归到尾部情况判断
  if (!scripts.length) {
    return fileWriteStream.end("console.log('Stream 合并完成')"); // 最后关闭可写流，防止内存泄漏
  }
 
  const currentFile = path.resolve(__dirname, sourceFileDirectory, scripts.shift());
  const currentReadStream = fs.createReadStream(currentFile); // 获取当前的可读流
 
  currentReadStream.pipe(fileWriteStream, { end: false });
  currentReadStream.on('end', function() {
    return streamMergeRecursive(scripts, fileWriteStream, sourceFileDirectory);
  });
 
  currentReadStream.on('error', function(error) { // 监听错误事件，关闭可写流，防止内存泄漏
    console.error(error);
    fileWriteStream.close();
  });
}
