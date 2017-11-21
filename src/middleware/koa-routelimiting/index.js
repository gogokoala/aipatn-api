import { request } from 'https';

'use strict';
const unless = require('koa-unless');
var debug = require('debug')('routelimiting')

module.exports = (opts = {}) => {

    const { maxAllowedRequest = 4 } = opts
    let queue = []
    let counter = 0

    const middleware = async function routeLimiting(ctx, next) {
        if (queue.length > maxAllowedRequest) {
            throw new Error('Server is too busy!!')
        }
        
        counter++;
        debug('counter++ = %d', counter)

        if (counter > maxAllowedRequest) {
            debug('push %d', counter)
            await new Promise((resolve, reject) => {
                queue.push(resolve);
            });
            debug('shift %d', counter)
        }

        await next();
        counter--;
        debug('counter-- = %d', counter)
        
        let resolve = queue.shift()
        if (resolve) {
            debug('run resolve %d', counter)
            resolve()
        }
    }

    middleware.unless = unless;
    return middleware;
};
