import { Context } from 'koa'

import * as Debug from 'debug'
const debug = Debug('aipatn.ping')

/**
 * Middleware ping
 */
export async function ping (ctx: Context, next: Function) {

    ctx.state.session.ping = 'pong'
    ctx.state.data = { status: 0, message: "pong" }
}