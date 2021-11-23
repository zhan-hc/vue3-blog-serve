const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const multer = require('koa-multer')
router.prefix('/blog/upload')
const operate = require('../../utils/common')
// 上传 图片
var storage = (path="images") => multer.diskStorage({
  destination: function(ctx, file, cb) {
  cb(null, `public/${path}/`)
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = (path) => multer({
storage: storage(path)
});


router.post('/images', upload().single('file'), async(ctx, next) => {
  ctx.success(
    {
      filename: ctx.req.file.filename //返回文件名
    }
    ,'上传文件成功')
})


router.post('/file', upload('file').single('file'), async(ctx, next) => {
  const folderName = ctx.req.body.fileName
  const fileName = ctx.req.file.filename
  const chunkName = `${ctx.req.body.chunkName}.${ctx.req.file.originalname}`
  try {
    const filePath = path.join(__dirname,`../../public/file/${folderName}`)
    // 判断文件夹是否存在
    if (!fs.existsSync(filePath)) {
      fs.mkdir(filePath, err => {
        if (err) throw err;
      });
    }
      await operate.moveFile(fileName,folderName,chunkName)
      
  } catch (e) {
      throw Error(e.msg);
  }
  ctx.success(fileName,'上传文件成功')
})

router.post('/mergeChunkFile', async(ctx, next) => {
  const {fileName, chunkName} = ctx.request.body
  // 存放切块的路径
  const chunkDir = path.join(__dirname,`../../public/file/mergeFile/${fileName}`)
  
  await operate.mergeFileChunk(chunkDir,chunkName)
  fs.rmdirSync(path.join(__dirname,`../../public/file/${chunkName}`));
 
  ctx.success('buf','上传文件成功')
})

router.post('/verifyFile', async(ctx, next) => {
  /*
    key: 文件hash
    chunkFile: 文件夹名称
    chunkLen：切片总数
  */
  const {key,chunkName,chunkLen} = ctx.request.body
  console.log(key,chunkName,chunkLen,'------------------')
  const shouldUpload = operate.hasFile(key)
  const filePath = path.join(__dirname,`../../public/file/${chunkName}`)
  let uploadChunk = []
    // 判断文件夹是否存在
    if (chunkName && fs.existsSync(filePath)) {
      chunkFiles = fs.readdirSync(`public/file/${chunkName}`)
      console.log(`-----------------------文件夹${chunkName}存在-------------+++++++++++++++++++++`,chunkFiles)
      if (chunkFiles.length < chunkLen) {
        const eq = (str) => parseInt(str.slice(str.lastIndexOf('-')+1,str.lastIndexOf('.')))
        // console.log(chunkFiles,'---chunkFiles')
        uploadChunk = chunkFiles.map(item => eq(item))
        console.log(chunkFiles.map(item => eq(item)))
        // ctx.success(uploadChunk,'有切片未上传成功')
      }
    }
  ctx.success({
    shouldUpload,
    uploadChunk
  },'上传文件成功')
})

module.exports = router