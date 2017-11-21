'use strict';
const unless = require('koa-unless');

module.exports = (opts = {}) => {

    const { maxAllowedRequest = 4, debug = false } = opts
    let queue = []
    let counter = 0

    const middleware = async function routeLimiting(ctx, next) {
        if (counter >= maxAllowedRequest) {
            await new Promise((resolve, reject) => {
                queue.push(resolve);
            });
        }

        counter++;
        await next();
        counter--;

        queue.shift()();
    }

    middleware.unless = unless;
    return middleware;
};
