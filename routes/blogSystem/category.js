const router = require('koa-router')()
const db = require('../../utils/db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
router.prefix('/blog/category')

// 获取博客分类
router.post('/getBlogCategoryList',  async function (ctx, next) {
  const { pageSize,currentPage, keyword,status } = ctx.request.body
  const params = {
    order: [
      ['createTime', 'DESC']
    ],
    where: {
      categoryName: {
        // 模糊查询
        [Op.like]:`%${typeof keyword !== 'undefined' ? keyword : ''}%`
      }
    }
  }
  if(typeof status !== 'undefined')  params.where.status = status
  // 如果有pagesize和currentpage
  if (typeof pageSize !== 'undefined' && typeof currentPage !== 'undefined') {
    params.offset = (currentPage - 1) * pageSize
    params.limit = pageSize
  }
  let data = await db.Category.findAndCountAll(params)
  ctx.success(data, '获取博客分类成功')
  // if (data.rows.length > 0) {
  //   ctx.success(data, '获取博客分类')
  // } else {
  //   ctx.fail('博客分类暂无数据', 401)
  // }
})
// 添加博客分类
router.post('/addBlogCategory',  async function (ctx, next) {
  const { categoryName } = ctx.request.body
  let hasCategory = await db.Category.findOrCreate({
    where: { categoryName: categoryName },
    defaults: {
      categoryName: categoryName,
      createTime: new Date(),
      updateTime: new Date(),
    }
  })
  if (hasCategory[1]) {
    ctx.success(hasCategory[0].id, '创建博客分类成功')
  } else {
    ctx.fail('博客分类名称重复', 4001)
  }
})
// 更改博客分类
router.post('/updateBlogCategory',  async function (ctx, next) {
  const { categoryName, id } = ctx.request.body
  const handleUpdate = async (categoryName,id) => {
    return await db.Category.update({ categoryName: categoryName,updateTime: new Date() }, {
      where: {
        id: id
      }
    })
  }
  let data = await db.Category.findAll({
    where: { categoryName: categoryName }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data.length === 0 || data[0].id === id) {
    let res = handleUpdate(categoryName,id)
    ctx.success(res, '更改博客分类名称成功')
  } else {
    ctx.fail('博客分类更改名称重复', 4001)
  }
})

// 上下线博客分类
router.post('/onlineBlogCategory',  async function (ctx, next) {
  const { status, id } = ctx.request.body
  let data = await db.Category.update({ status: status}, {
    where: {
      id: id
    }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data[0] === 1) {
    ctx.success(data, `博客分类${status === 1 ? '上线' : '下线'}成功`)
  } else {
    ctx.fail(`博客分类${status === 1 ? '上线' : '下线'}失败`, 4002)
  }
})

// 删除博客分类
router.post('/deleteBlogCategory',  async function (ctx, next) {
  const { id } = ctx.request.body
  let data = await db.Category.destroy({
    where: {
      id: id
    }
  })
  // 如果数据库不存在或者当前更改的名称未变
  if (data === 1) {
    ctx.success(data, `博客分类删除成功`)
  } else {
    ctx.fail(`博客分类删除失败`, 4002)
  }
})
module.exports = router