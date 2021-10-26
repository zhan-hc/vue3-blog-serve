const router = require('koa-router')()
const db = require('../../utils/db')
router.prefix('/blog/tag')

// 登录接口
router.post('/getBlogTagList',  async function (ctx, next) {
  const { pageSize,currentPage } = ctx.request.body
  let data = await db.Tag.findAndCountAll({
    offset: (currentPage - 1) * pageSize,
    limit: pageSize
  })
  ctx.success(data)
  if (data.rows.length > 0) {
    ctx.success(data)
  } else {
    ctx.fail('暂无数据', 401)
  }
})

module.exports = router