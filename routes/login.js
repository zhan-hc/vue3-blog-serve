const router = require('koa-router')()
const db = require('../utils/db')
const jwt=require('jsonwebtoken')
router.prefix('/login')

// 生成token
function makeToken (data) {
    let created = Math.floor(Date.now() / 1000)
    return token = jwt.sign({ 
      data, // 根据userId生成token
      exp: created + 60 * 30, // 设置过期时间30分钟
      iat: created, // 创建时间
    }, 'zhc')
}
// 登录接口
router.post('/',  async function (ctx, next) {
  const { username,password } = ctx.request.body
  let data = await db.User.findAll({
    attributes:['password','id'],
    where: {
      username: username
    }
  })
  if (data.length === 1 && data[0].password === password) {
    let token = makeToken(data[0].id)
    ctx.success({token:token,userId: data[0].id})
  } else {
    ctx.fail('账号或密码错误！', 4002)
  }
})

module.exports = router