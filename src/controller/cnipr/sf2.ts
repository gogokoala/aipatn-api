import { Context } from 'koa'
import Axios from 'axios'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import * as Debug from 'debug'
import { commonStatus } from '../../lib/error';
import { PatentResponse } from './cnipr';

const debug = Debug('cnipr.sf2')

/**
 * Middleware sf2
 * headers => x-session-id, auth
 * query => pid
 */
export async function sf2 (ctx: Context, next: Function) {
    let sf2Resp: PatentResponse

    const req = ctx.request
    debug('req.body: %o', req.query)

    if (!req.query || !req.query.pid) {
        throw new Error('无效的请求')
    }

    const pid = req.query.pid

    const params = oauth2.getApiParams()
    const clientId = params.clientId
    const openId = params.openId
    const accessToken = params.accessToken

    const url = 'https://open.cnipr.com/cnipr-api/rs/api/search/sf2/' + clientId
    let res = await Axios({
        url: url,
        method: 'get',
        params:{
            pid: pid,
            openid: openId,
            access_token: accessToken
        },
    })

    sf2Resp = res.data
    debug('sf1 result = %s, %s', sf2Resp.status, sf2Resp.message)
    if (sf2Resp.status === '0') {
        ctx.state.data = sf2Resp
    } else {
        ctx.state.error = commonStatus.normalize(sf2Resp.status, sf2Resp.message)
        throw new Error(ctx.state.error.message)
    }
}
