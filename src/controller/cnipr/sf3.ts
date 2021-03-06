import { Context } from 'koa'
import Axios from 'axios'
import { redisStore } from '../../middleware/redisstore'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import { PatentResponse, sectionInfo } from './cnipr'
import * as Debug from 'debug'
import { decodeBase64 } from '../../lib/base64';
import { commonStatus } from '../../lib/error';

const debug = Debug('cnipr.sf1')

/**
 * Middleware sf1
 * headers => x-session-id, auth
 * body => exp, dbs, order, option, from, to, displayCols
 */
export async function search (ctx: Context, next: Function) {
    const req = ctx.request;
    debug('req.body: %o', req.body)

    const searchParams = req.body
    if (!searchParams || !searchParams.exp) {
        throw new Error('无效的请求')
    }
    /**
     * 下列参加中
     * exp 必选
     * dbs、order等 可选
     */
    const exp = decodeExp(searchParams.exp)
    const dbs = searchParams.dbs ? searchParams.dbs : 'FMZL,FMSQ,SYXX,WGZL'
    const order = searchParams.order ? searchParams.order : ''
    const option = searchParams.option && parseInt(searchParams.option) < 3  ? searchParams.option : 2
    const from = searchParams.from && !isNaN(searchParams.from) ? searchParams.from : 0
    const to = searchParams.to && !isNaN(searchParams.to) ? searchParams.to : 10
    const displayCols = searchParams.displayCols ? searchParams.displayCols : ''

    const params = oauth2.getApiParams()
    const clientId = params.clientId
    const url = 'https://open.cnipr.com/cnipr-api/rs/api/search/sf1/' + clientId
    const openId = params.openId
    const accessToken = params.accessToken

    debug('exp = %s, dbs = %s', exp, dbs)
    let res = await Axios({
        url: url,
        method: 'post',
        params:{
            exp: exp,
            dbs: dbs,
            order: order,
            option: option,
            from: from,
            to: to,
            displayCols: displayCols,
            openid: openId,
            access_token: accessToken
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    let sf1Resp: PatentResponse = res.data
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

function decodeExp(exp: string) {
    const s = decodeBase64(exp)
    debug('exp from base64 = %o', s)
    
    return exp
}
