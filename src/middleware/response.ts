import * as Debug from 'debug'
import { Context } from 'koa'

const debug = Debug('middleware.response')
/**
 * 响应处理模块
 */
export async function response (ctx: Context, next: Function) {
    try {
        // 调用下一个 middleware
        await next()

        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code !== undefined ? ctx.state.code : 0,
            data: ctx.state.data !== undefined ? ctx.state.data : { message: 'OK' }
        }
    } catch (err) {
        // catch 住全局的错误信息
        debug('Catch Error: %o', err)

        // 设置状态码为 500 - 服务端错误
        if (err.status) {
            ctx.status = err.status
            if (err.status === 401) {
                ctx.body = {code: err.status, message: 'Unauthorized'}
            } else if (err.status == 403) {
                ctx.body = {code: err.status, message: 'Forbidden'}
            } else if (err.status == 405) {
                ctx.body = {code: err.status, message: 'Method Not Allowed'}
            } else {
                ctx.body = {code: err.status, message: 'Internal Server Error'}
            }
        } else {
            ctx.status = 200
            let message = err.originalError ? err.originalError.message : err.message
            ctx.body = {code: -1, message}
        }
/*
        // 输出详细的错误信息
        if (!ctx.state.error) {
            ctx.state.error = {
                status: '-1',
                message: e && e.message ? e.message : e.toString()
            }
        }

        ctx.body = {
            code: -1,
            error: ctx.state.error
        }
*/        
    }
    
    debug('Respose: %s - %o', ctx.status, ctx.body)
}
