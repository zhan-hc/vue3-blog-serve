const router = require('koa-router')()
const db = require('../../utils/db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
router.prefix('/blog/tag')

// 获取博客标签
router.post('/getBlogTagList',  async function (ctx, next) {
  const { pageSize,currentPage, tagName,status } = ctx.request.body
  const params = {
    // offset: (currentPage - 1) * pageSize,
    // limit: pageSize,
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      tagName: {
        // 模糊查询
        [Op.like]:`%${typeof tagName !== 'undefined' ? tagName : ''}%`
      }
    }
  }
  if(typeof status !== 'undefined')  params.where.status = status
  // 如果有pagesize和currentpage
  if (typeof pageSize !== 'undefined' && typeof currentPage !== 'undefined') {
    params.offset = (currentPage - 1) * pageSize
    params.limit = pageSize
  }
  let data = await db.Tag.findAndCountAll(params)
  ctx.success(data, '获取博客标签成功')
  // if (data.rows.length > 0) {
  //   ctx.success(data, '获取博客标签')
  // } else {
  //   ctx.fail('博客标签暂无数据', 401)
  // }
})
// 添加博客标签
router.post('/addBlogTag',  async function (ctx, next) {
  const { tagName } = ctx.request.body
  let hasTag = await db.Tag.findOrCreate({
    where: { tagName: tagName },
    defaults: {
      tagName: tagName,
      createTime: new Date(),
      updateTime: new Date(),
    }
  })
  if (hasTag[1]) {
    ctx.success(hasTag[0].id, '创建博客标签成功')
  } else {
    ctx.fail('博客标签名称重复', 4001)
  }
})
// 更改博客标签
router.post('/updateBlogTag',  async function (ctx, next) {
  const { tagName, id } = ctx.request.body
  const handleUpdate = async (tagName,id) => {
    return await db.Tag.update({ tagName: tagName,updateTime: new Date() }, {
      where: {
        id: id
      }
    })
  }
  let data = await db.Tag.findAll({
    where: { tagName: tagName }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data.length === 0 || data[0].id === id) {
    let res = handleUpdate(tagName,id)
    ctx.success(res, '更改博客标签名称成功')
  } else {
    ctx.fail('博客标签更改名称重复', 4001)
  }
})

// 上下线博客标签
router.post('/onlineBlogTag',  async function (ctx, next) {
  const { status, id } = ctx.request.body
  let data = await db.Tag.update({ status: status}, {
    where: {
      id: id
    }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data[0] === 1) {
    ctx.success(data, `博客标签${status === 1 ? '上线' : '下线'}成功`)
  } else {
    ctx.fail(`博客标签${status === 1 ? '上线' : '下线'}失败`, 4002)
  }
})

// 删除博客标签
router.post('/deleteBlogTag',  async function (ctx, next) {
  const { id } = ctx.request.body
  let data = await db.Tag.destroy({
    where: {
      id: id
    }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data === 1) {
    ctx.success(data, `博客标签删除成功`)
  } else {
    ctx.fail(`博客标签删除失败`, 4002)
  }
})
module.exports = router