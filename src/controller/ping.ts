import { Context } from 'koa'
import * as Debug from 'debug'

const debug = Debug('controller.ping')

/**
 * Middleware ping
 */
export async function ping (ctx: Context, next: Function) {

    debug('ping');

    let data = await delay();
    
    ctx.state.session.ping = data;
    ctx.state.data = { status: 0, message: data };
}

async function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('pong')
        }, 3000);
    });
}