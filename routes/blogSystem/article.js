const router = require('koa-router')()
const db = require('../../utils/db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
router.prefix('/blog/article')

// 获取博客文章
router.post('/getBlogArticleList',  async function (ctx, next) {
  const { pageSize,currentPage, title, id, status} = ctx.request.body
  const params = {
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      title: {
        // 模糊查询
        [Op.like]:`%${typeof title !== 'undefined' ? title : ''}%`
      }
    }
  }
  if (typeof pageSize !== 'undefined' && typeof currentPage !== 'undefined') {
    params.offset = (currentPage - 1) * pageSize
    params.limit = pageSize
  }
  if(typeof id !== 'undefined')  params.where.id = id
  if(typeof status !== 'undefined')  params.where.status = status
  let data = await db.Article.findAndCountAll(params)
  ctx.success(data, '获取博客文章成功')
  // if (data.rows.length > 0) {
  //   ctx.success(data, '获取博客文章')
  // } else {
  //   ctx.fail('博客文章暂无数据', 401)
  // }
})
// 添加博客文章
router.post('/addBlogArticle',  async function (ctx, next) {
  const { title,content,desc,tagId } = ctx.request.body
  const params = {
    ...ctx.request.body,
    'tag_id': tagId.toString(),
    createTime: new Date(),
    updateTime: new Date()
  }
  delete params.check
  let data = await db.Article.create(params)
  if (data) {
    ctx.success(data.id, '创建博客文章成功')
  } else {
    ctx.fail('博客文章名称重复', 4001)
  }
})
// 更改博客文章
router.post('/updateBlogArticle',  async function (ctx, next) {
  const { id, title,tagId,desc,content,pageImage } = ctx.request.body
  const params = {
    ...ctx.request.body,
    'tag_id': tagId.toString(),
    updateTime: new Date()
  }
  delete params.tagId
  delete params.check
  let data = await db.Article.update(params, {
    where: {
      id: id
    }
  })
  ctx.success(data, '更改博客文章名称成功')
  // // 如果数据库不存在或者当前更改的名称未变
  // if (data.length === 0 || data[0].id === id) {
  //   let res = handleUpdate(tagName,id)
  //   ctx.success(res, '更改博客文章名称成功')
  // } else {
  //   ctx.fail('博客文章更改名称重复', 4001)
  // }
})

// 增加阅读量
router.post('/addArticleReading',  async function (ctx, next) {
  const { id } = ctx.request.body
  let data = await db.Article.findAll({
    attributes:['reading'],
    where: {
      id: id
    }
  })
  // ctx.success(data, '更改文章量成功')
  if (data.length === 1) {
      const params = {
        reading: data[0].reading + 1
      }
      console.log(params)
    let status = await db.Article.update(params, {
      where: {
        id: id
      }
    })
    ctx.success(status, '更改文章量成功')
  }
})

// 上下线博客文章
router.post('/onlineBlogArticle',  async function (ctx, next) {
  const { status, id } = ctx.request.body
  let data = await db.Article.update({ status: status}, {
    where: {
      id: id
    }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data[0] === 1) {
    ctx.success(data, `博客文章${status === 1 ? '上线' : '下线'}成功`)
  } else {
    ctx.fail(`博客文章${status === 1 ? '上线' : '下线'}失败`, 4002)
  }
})

// 删除博客文章
router.post('/deleteBlogArticle',  async function (ctx, next) {
  const { id } = ctx.request.body
  let data = await db.Article.destroy({
    where: {
      id: id
    }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data === 1) {
    ctx.success(data, `博客文章删除成功`)
  } else {
    ctx.fail(`博客文章删除失败`, 4002)
  }
})
module.exports = router