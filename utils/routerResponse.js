function routerResponse(option={}){
  return async function(ctx,next){
      ctx.success = function (data, msg) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : option.successCode || 200,
              msg : msg || 'success',
              data : data
          }
      }

      ctx.fail = function (msg,code) {
          ctx.type = option.type || 'json'
          ctx.body = {
              code : code || option.failCode || 99,
              msg : msg || option.successMsg || 'fail',
          }
      }

      await next()
  }

}


module.exports= routerResponse