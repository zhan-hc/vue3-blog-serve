const router = require('koa-router')()
const multer = require('koa-multer')
router.prefix('/blog/upload')
// 上传 图片
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
  cb(null, 'public/images/')
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({
storage: storage
});
// upload.single('file'),
router.post('/images', upload.single('file'), async(ctx, next) => {
  ctx.success(
    {
      filename: ctx.req.file.filename //返回文件名
    }
    ,'上传文件成功')
})
module.exports = router