const Promise = require("bluebird")
const jwt = require("jsonwebtoken")
const verify = Promise.promisify(jwt.verify)
 
async function check(ctx, next) {
  try{
    let url = ctx.request.url
    // 登录 不用检查
    if (url == "/login") await next()
    else {
      let token = ctx.request.headers["authorization"]
      if (token) {
        let payload = await verify(token,'zhc')
        let { iat, exp } = payload
        if (iat<exp) {
          await next()
        }
      } else {
        ctx.fail('请登录',501)
      }
    }
  } catch (err) {
    console.log(err.name, '异常信息')
    if (err.name == 'TokenExpiredError') {
      ctx.fail('token过期,请重新登录！',10010)
    }else if (err.name == 'JsonWebTokenError') {
      ctx.fail('无效的token,请重新登录！',10011)
    }
  }
}


module.exports = check