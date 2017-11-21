import { request } from 'https';

'use strict';
const unless = require('koa-unless');
var debug = require('debug')('routelimiting')

module.exports = (opts = {}) => {

    const { maxAllowedRequest = 4, maxQueueLength = 200 } = opts
    let queue = []
    let counter = 0

    const middleware = async function routeLimiting(ctx, next) {
        if (queue.length > maxQueueLength) {
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

        let err
        try {
            await next();
        } catch (e) {
            err = e
        }
        counter--;
        debug('counter-- = %d', counter)
        
        let resolve = queue.shift()
        if (resolve) {
            debug('run resolve %d', counter)
            resolve()
        }

        if (err) {
            throw err
        }
    }

    middleware.unless = unless;
    return middleware;
};
