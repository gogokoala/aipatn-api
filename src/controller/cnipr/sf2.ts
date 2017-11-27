import {getManager} from 'typeorm';
import { Context } from 'koa'
import Axios from 'axios'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import * as Debug from 'debug'
import { commonStatus } from '../../lib/error';
import { PatentResponse } from './cnipr';
import { Patent } from '../../entity/patent';

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

    // 本地已存在
    const dbPatent = getManager().getRepository(Patent)
    let vo = await dbPatent.findOne({ pid: pid  })
    if (vo) {
        sf2Resp = { status: '0', message: 'SUCCESS', results: [ vo ] }
        ctx.state.data = sf2Resp
        return
    }

    // 本地不存在，去cnipr获取
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

        // 保存cnipr数据到本地数据库
        const patentItems = sf2Resp.results
        if (patentItems) {
            for (let i = 0; i < patentItems.length; i++) {
                const r = patentItems[i]
                // 处理priority中的逗号,注意取出时需恢复
                if (r.priority) {
                    for (let j = 0; j < r.priority.length; j++) {
                          const p = r.priority[j]
                          r.priority[i] = p.replace(/,/g, ';')
                    }
                }
                vo = await dbPatent.save(r)
            }
        }

    } else {
        ctx.state.error = commonStatus.normalize(sf2Resp.status, sf2Resp.message)
        throw new Error(ctx.state.error.message)
    }
}
