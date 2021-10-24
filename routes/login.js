const router = require('koa-router')()
const jwt=require('jsonwebtoken')
router.prefix('/login')

// 生成token
function makeToken (name, password, exp) {
    return token = jwt.sign({ name, password, exp }, 'zhc')
}

router.post('/', function (ctx, next) {
  // ctx.success( '登录成功！')
  let { username,password } = ctx.request.body
  if (username === 'admin' && password === 'admin') {
    let token = makeToken(username,password,60*60)
    ctx.success({data: token,successMsg: '登录成功！'})
  } else {
    ctx.fail('账号或密码错误！', 4002)
  } 
})

module.exports = router