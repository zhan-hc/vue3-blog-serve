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
      await operate.exitsFolder(filePath);
      setTimeout(() => {
        operate.moveFile(fileName,folderName,chunkName)
      },500)
      
  } catch (e) {
      throw Error(e.msg);
  }
  ctx.success(fileName,'上传文件成功')
})

router.post('/mergeChunkFile', async(ctx, next) => {
  const {fileName, chunkName} = ctx.request.body
  // 存放切块的路径
  const chunkDir = path.join(__dirname,`../../public/file/${fileName}`)
  
  await operate.mergeFileChunk(chunkDir,chunkName)
  fs.rmdirSync(path.join(__dirname,`../../public/file/${chunkName}`));
 
  ctx.success('buf','上传文件成功')
})

router.post('/verifyFile', async(ctx, next) => {
  const {key} = ctx.request.body
  const shouldUpload = operate.hasFile(key)
  ctx.success({
    shouldUpload
  },'上传文件成功')
})

module.exports = router