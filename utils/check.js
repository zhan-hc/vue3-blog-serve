const Promise = require("bluebird")
const jwt = require("jsonwebtoken")
const verify = Promise.promisify(jwt.verify)
 
async function check(ctx, next) {
  let url = ctx.request.url
  // 登录 不用检查
  if (url == "/login") await next()
  else {
    let token = ctx.request.headers["authorization"]
    if (token) {
      let payload = await verify(token,'zhc')
      let { time, timeout } = payload
      let data = new Date().getTime()
      if (data - time <= timeout) {
        await next()
      } else {
        ctx.fail('登录已失效，请重新登录',50014)
      }
    } else {
      ctx.fail('请登录',501)
    }
  }
}
 
module.exports = check