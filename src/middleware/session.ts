import { Context } from 'koa'
import { redisStore } from './redisstore'

import * as Debug from 'debug'
const debug = Debug('aipatn.session')

export function session (opts: any = {}) {
    const { key = 'x-session-id', store = redisStore } = opts

    return async (ctx: Context, next: Function) => {
        let id = ctx.cookies.get(key, opts)
        debug('%s: %s', key, id)

        if(!id) {
            ctx.state.session = {}
        } else {
            ctx.state.session = await store.get(id, ctx)
            
            // check session must be a no-null object
            if(typeof ctx.state.session !== "object" || ctx.state.session == null) {
                ctx.state.session = {}
            }
        }
        debug('session: %o', ctx.state.session)
        
        const old = JSON.stringify(ctx.state.session)

        await next()

        // if not changed
        if(old == JSON.stringify(ctx.state.session)) return

        // if is an empty object
        if(ctx.state.session instanceof Object && !Object.keys(ctx.state.session).length) {
            ctx.state.session = null
        }

        // need clear old session
        if(id && !ctx.state.session) {
            debug('clear old session, %s', id)
            await store.destroy(id, ctx)
            return
        }

        // set/update session
        const sid = await store.set(ctx.state.session, Object.assign({}, opts, {sid: id}), ctx)
        ctx.cookies.set(key, sid, opts)
        debug('%s: %s', key, sid)
    }
}
