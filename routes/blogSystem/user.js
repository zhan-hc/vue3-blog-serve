const router = require('koa-router')()
const db = require('../../utils/db')
const Sequelize = require('sequelize')
router.prefix('/blog/user')

// 获取博客标签
router.post('/getBlogUserInfo',  async function (ctx, next) {
  const { id } = ctx.request.body
  let data = await db.User.findAll({
    attributes: ['blogName', 'motto','github','avatar'],
    where: { id: id }
  })
  if (data.length === 1) {
    ctx.success(data, '查询用户信息成功')
  } else {
    ctx.fail('查询用户信息失败', 4001)
  }
})

// 更改博客标签
router.post('/updateBlogUserInfo',  async function (ctx, next) {
  const { id } = ctx.request.body
  const params = {
    ...ctx.request.body,
    updateTime: new Date()
  }
  delete params.id
  const data = await db.User.update(params, {
      where: {
        id: id
      }
    })
  // 如果数据库不存在或者当前更改的名称未变
  if (data[0] === 1) {
    ctx.success(data, '更改用户信息成功')
  } else {
    ctx.fail('更改用户信息失败', 4001)
  }
})

module.exports = router