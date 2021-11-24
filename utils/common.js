const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

// 判断文件夹是否存在
exitsFolder = async function (reaPath) {
  const absPath = path.resolve(__dirname, reaPath);
  fs.stat(absPath, function (err, stats) {
      if (!stats) {
          fs.mkdir(absPath, {recursive: true}, err => {
              if (err) throw err;
          }); //Create dir in case not found
      }
  });
}
// 移动文件
moveFile = async function (fileName,movePath,newFileName) {
  var sourceFile = path.join(__dirname, `../public/file/${fileName}`);
  var destPath = path.join(__dirname, `../public/file/${movePath}`, newFileName);
  fs.rename(sourceFile, destPath, function (err) {
    if (err) throw err;
    // fs.stat(destPath, function (err, stats) {
    //   if (err) throw err;
    // });
  });
}

const pipeStream = (path, writeStream) => {
  return new Promise(resolve => {
      const readStream = fs.createReadStream(path);
      readStream.on("end", () => {
          fs.unlinkSync(path);
          resolve();
      });
      readStream.pipe(writeStream);
  });
}

// 合并切片
const mergeFileChunk = async (filePath, chunkName, size = 5 * 1024 * 1024) => {
  
  // filePath：将切片合并的路径
  // 切片文件路径
  const chunkDir = path.join(__dirname,`../public/file/${chunkName}`)
  // 获取切片文件夹里所有切片，返回一个数组
  let chunkPaths = fs.readdirSync(`public/file/${chunkName}`)
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  // 截取索引
  const eq = (str) => parseInt(str.slice(str.lastIndexOf('-')+1,str.lastIndexOf('.')))
  // 因为是异步请求所以索引顺序不一定一致
  chunkPaths.sort((a, b) => eq(a) - eq(b))
  const arr = chunkPaths.map((chunkPath, index) => {
      return pipeStream(
          path.resolve(chunkDir, chunkPath),
          // 指定位置创建可写流
          fs.createWriteStream(filePath, {
              start: index * size,
              end: (index + 1) * size
          })
      )
  })
  await Promise.all(arr)
};

// 获取文件hash
function createHash (fileName) {
  const buffer = fs.readFileSync(path.join(__dirname,`../public/file/mergeFile/${fileName}`));
  const fsHash = crypto.createHash('md5');
  fsHash.update(buffer);
  const md5 = fsHash.digest('hex');
  return md5
}

// 文件hash校验
function hasFile (fileHash) {
  filePaths = fs.readdirSync(`public/file/mergeFile`)
  const len = filePaths.length
  let flag = true
  for(let i = 0;i<len;i++) {
    // 先判断file里有没有该分片文件夹
    const hash = createHash(filePaths[i])
    if (fileHash === hash){
      flag = false
      break
    }
  }
  console.log(flag,'-------flag')
  return flag
}

module.exports= {
  moveFile,
  hasFile,
  exitsFolder,
  mergeFileChunk
}