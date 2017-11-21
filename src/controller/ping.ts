import { Context } from 'koa'

import * as Debug from 'debug'
const debug = Debug('aipatn.ping')

const queue: Array<any> = [];

/**
 * Middleware ping
 */
export async function ping (ctx: Context, next: Function) {

    debug('ping')

    setTimeout(() => {
        queue.shift()();
    }, 30000);
    await delay();
    
    ctx.state.session.ping = 'pong'
    ctx.state.data = { status: 0, message: "pong" }
}

async function delay() {
    return new Promise((resolve, reject) => {
        queue.push(resolve);
    });
}