var express = require("express");
const multer = require("multer");
var router = express.Router();
const path = require('path')
const fs = require('fs')
const pump = require('pump')

// const { UploadError } = require("../utils/errors");
const { formatResponse, streamMerge } = require("../utils/util")


const uploadPath = path.join(__dirname, '../public/static/uploads');
const upload = multer({dest: uploadPath}) // 要存放文件的路径

const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

const del = (p) => { 
  let arr = fs.readdirSync(p); 
  for(var i in arr){ 
    //读取文件信息，以便于判断是否是一个文件或目录 
    var stats=fs.statSync(p+'/'+arr[i]); 
    if(stats.isFile()){ 
      //判断为真，是文件则执行删除文件 
      fs.unlinkSync(p+'/'+arr[i]); 
    }else{ 
      //判断为假就是文件夹，就调用自己，递归的入口 
      del(p+'/'+arr[i]); 
    } 
  } 
  //删除空目录 
  fs.rmdirSync(p); 
} 

// 上传文件接口
router.post("/", upload.single('file'), async function (req, res, next) {
  let result = {}
  const { name, total, index, chunkSize, hash } = req.body
  const file = req.file

  const chunksPath = path.join(uploadPath, ''+hash + '-' + chunkSize, '/');

  if (!fs.existsSync(chunksPath)) mkdirsSync(chunksPath);
  // 创建读入流
  const readStream = fs.createReadStream(''+file.path);
  // 创建写入流
  const writeStream = fs.createWriteStream(''+chunksPath + hash + '-' + index);
  // 管道输送
  readStream.pipe(writeStream);
  readStream.on('end', () => { 
    // 删除临时文件
    fs.unlinkSync(file.path);
  });
  result = {
    code: 0,
    msg: '上传成功',
    data: "",
  };

  res.send(formatResponse(0, "", result));
});


router.post('/checkhash', upload.single('file'), async function (req, res, next) {
  const { total, hash, chunkSize, name } = req.body
  let result = {}

  // 上传的文件哈希文件夹加名
  const chunksPath = path.join(uploadPath, ''+hash + '-' + chunkSize, '/');
  const filePath = path.join(uploadPath, ''+name);
  if (fs.existsSync(filePath)) {
    // 文件已存在
    result = {
      code: 0,
      msg: '检查成功，文件在服务器上已存在，不需要重复上传',
      data: {
        type: 0, // type=0 为文件已上传过
      },
    };
  }else {
    if (fs.existsSync(chunksPath)) {
      // 存在文件切片文件夹，上传没有上传完
      // 上次没有上传完成，找到以及上传的切片
      const index = [];
      const chunks = fs.readdirSync(chunksPath);

      if (chunks.length === Number(total)) {
        // 切片上传完了，没有合并
        result = {
          code: 0,
          msg: '切片上传完毕，没有合并',
          data: {
            type: 1, // type=1 切片上传完毕，没有合并
          },
        };
      } else {
        // 切片没有上传完
        chunks.forEach(item => {
          const chunksNameArr = item.split('-');
          index.push(chunksNameArr[chunksNameArr.length - 1]);
        });
        result = {
          code: 0,
          msg: '检查成功，需要断点续传',
          data: {
            type: 2, // type= 2 需要断点续传
            index,
          },
        };
      }
    } else {
      // 没有这个文件的切片和文件
      result = {
        code: 0,
        msg: '检查成功，为从未上传',
        data: {
          type: 3, // type=3 为从未上传
        },
      };
    }
  }
  
  res.send(formatResponse(0, "", result));
})

// 合并流
// function streamMerge(source, target) {
//   const files = fs.createReadStream(path.resolve(__dirname, source))
//   const targetFiles = fs.createWriteStream(path.resolve(__dirname, target))

//   let res = pump(files, targetFiles, function(err) {
//     console.log('pipe finished', err)
//   })

//   console.log(res, 'pumpres');

//   setTimeout(() => {
//     targetFiles.destroy()
//   }, 10000)
// }

router.post('/merge', async function (req, res, next) {
  let result = {}
  const { chunkSize, name, total, hash } = req.body;
  // 根据hash值，获取分片文件。
  const chunksPath = path.join(uploadPath, ''+hash + '-' + chunkSize, '/');
  const filePath = path.join(uploadPath, ''+name);
  const extname = path.extname(name);
  const targetFile = `${uploadPath}${path.sep}${hash + '-' + chunkSize}${extname}`

  // 读取所有的chunks 文件名存放在数组中, 并进行排序
  const chunks = fs.readdirSync(chunksPath).sort((a, b) => (
    a.split('-')[1] - b.split('-')[1]
  ));
  const chunksPathList = [];
  if (chunks.length !== total || chunks.length === 0) {
    result = {
      code: 0,
      msg: '切片文件数量与请求不符合，无法合并',
      data: '',
    };
  }
  chunks.forEach((item) => {
    chunksPathList.push(path.join(chunksPath, ''+item));
  });
  try {
    streamMerge(chunksPath, targetFile);
    // 递归删除文件
    del(chunksPath);
    result = {
      code: 0,
      msg: '合并成功',
      data: '',
    };
  } catch {
    result = {
      code: 0,
      msg: '合并失败，请重试',
      data: '',
    };
  }

  res.send(formatResponse(0, '', result))
})

module.exports = router;