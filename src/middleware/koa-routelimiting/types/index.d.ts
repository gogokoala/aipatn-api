// Type definitions for koa-routelimiting 1.x
// Project: https://github.com/gogokoala/routelimiting
// Definitions by: Steps Ding <https://github.com/gogokoala/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import Koa = require("koa");

export = routeLimiting;

declare function routeLimiting(options: RouteLimiting.Options): RouteLimiting.Middleware;

declare namespace RouteLimiting {
    export interface Options {
        maxAllowedRequest?: number
        debug?: boolean;
    }

    export interface Middleware extends Koa.Middleware {
        unless(params?: any): any;
    }
}
