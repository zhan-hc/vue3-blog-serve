const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig')
const jwt=require('jsonwebtoken')
router.prefix('/login')

// 生成token
function makeToken (name, password, exp) {
    return token = jwt.sign({ name, password, exp }, 'zhc')
}

router.post('/',  async function (ctx, next) {
  // ctx.success( '登录成功！')
  const { username,password } = ctx.request.body
  await userService.findUserData(username).then((data) => {
        const userData = data[0]
        console.log(userData.password,password)
        if (userData.password === password) {
          let token = makeToken(username,password,60*60)
          ctx.success(token)
        } else {
          ctx.fail('账号或密码错误！', 4002)
        }
      }).catch(() => {
        ctx.fail('账号或密码错误！', 4002)
      })
  // if (username === 'admin' && password === 'admin') {
  //   let token = makeToken(username,password,60*60)
  //   ctx.success({data: token,successMsg: '登录成功！'})
  // } else {
    // ctx.fail('账号或密码错误！', 4002)
  // } 
})

module.exports = router