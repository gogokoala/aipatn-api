import { Context } from 'koa'
import Axios from 'axios'
import { redisStore } from '../../middleware/redisstore'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import { sf1Data, sf1Response, sectionInfo } from './cnipr'
import * as Debug from 'debug'
import { decodeBase64 } from '../../lib/base64';
import { commonStatus } from '../../lib/error';

const debug = Debug('cnipr.sf2')

/**
 * Middleware sf2
 * headers => x-session-id, auth
 * body => pid
 */
export async function sf2 (ctx: Context, next: Function) {
    const req = ctx.request;
    debug('req.body: %o', req.body)

    const searchParams = req.body
    if (!searchParams || !searchParams.pid) {
        throw new Error('无效的请求')
    }
    /**
     * pid 必选
     */
    const pid = searchParams.pid

    const params = oauth2.getApiParams()
    const clientId = params.clientId
    const openId = params.openId
    const accessToken = params.accessToken

    const url = 'https://open.cnipr.com/cnipr-api/rs/api/search/sf2/' + clientId

    debug('pid = %s', pid)
    let res = await Axios({
        url: url,
        method: 'get',
        params:{
            pid: pid,
            openid: openId,
            access_token: accessToken
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    let sf1Resp: sf1Response = res.data
    debug('sf1 result = %s, %s', sf1Resp.status, sf1Resp.message)
    if (sf1Resp.status === '0') {
        ctx.state.data = sf1Resp
    } else {
        ctx.state.error = commonStatus.normalize(sf1Resp.status, sf1Resp.message)
        throw new Error(ctx.state.error.message)
    }

    // TODO - 检索条件保存至Session
    // TODO- 检索条件保存至数据库
}
