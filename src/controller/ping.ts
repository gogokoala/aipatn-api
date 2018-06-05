import { Context } from 'koa'
import * as Debug from 'debug'

const debug = Debug('controller.ping')

/**
 * Middleware ping
 */
export async function ping (ctx: Context, next: Function) {

    debug('ping');
/*
    let test: any
    test = undefined
    debug('undefined: %o', test ? true:false) // false
    test = null
    debug('null: %o', test ? true:false) // false
    test = ''
    debug('empty: %o', test ? true:false) // false
    test = '1'
    debug('1: %o', test ? true:false) // true
    test = {}
    debug('object: %o', test ? true:false) // true
    test = []
    debug('array: %o', test ? true:false) // true
*/

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