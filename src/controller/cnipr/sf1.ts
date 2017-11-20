import {getManager} from 'typeorm';
import { Context } from 'koa'
import Axios from 'axios'
import { redisStore } from '../../middleware/redisstore'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import { sf1Data, sf1Response, sectionInfo } from './cnipr'
import * as Debug from 'debug'
import { decodeBase64 } from '../../lib/base64';
import { sha1 } from '../../lib/sha1';
import { commonStatus } from '../../lib/error';
import { Sf1History } from '../../entity/sf1history';

const debug = Debug('cnipr.sf1')

/**
 * Middleware sf1
 * headers => x-session-id, auth
 * body => exp, dbs, order, option, from, to, displayCols
 */
export async function sf1 (ctx: Context, next: Function) {
    let sf1Resp: sf1Response

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
    const exp = searchParams.exp
    const dbs = searchParams.dbs ? searchParams.dbs : 'FMZL,FMSQ,SYXX,WGZL'
    const order = searchParams.order ? searchParams.order : ''
    const option = searchParams.option && parseInt(searchParams.option) < 3  ? searchParams.option : 2
    const from = searchParams.from && !isNaN(searchParams.from) ? searchParams.from : 0
    const to = searchParams.to && !isNaN(searchParams.to) ? searchParams.to : 10
    const displayCols = searchParams.displayCols ? searchParams.displayCols : ''
    const displayParams: string = searchParams.dp // 显示用条件
    const jsonParams: string = searchParams.jp // 查询对象JSON串，BASE64编码 

    // 查看缓存
    const cache = {
        exp,
        dbs,
        order,
        option,
        from,
        to,
        displayCols
    }
    const cacheKey = sha1(JSON.stringify(cache))
    sf1Resp = await redisStore.get(cacheKey, ctx)
    if (sf1Resp) {
        debug('cached sf1 result = %s, %s', sf1Resp.status, sf1Resp.message)
        ctx.state.data = sf1Resp
        return
    } 

    // 向cnipr请求数据
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

    sf1Resp = res.data
    debug('sf1 result = %s, %s', sf1Resp.status, sf1Resp.message)
    // redis缓冲数据, 30分钟
    await redisStore.set(sf1Resp, {sid: cacheKey}, ctx);
    // 
    if (sf1Resp.status === '0') {
        ctx.state.data = sf1Resp

        if (ctx.state.session.logged && ctx.state.session.uid) {
            // 保存检索条件
            const dbRepository = getManager().getRepository(Sf1History)

            // 生成对象
            const now = moment().format('YYYY-MM-DD HH:mm:ss')
            let vo = new Sf1History()
            vo.uid = ctx.state.session.uid
            vo.title = displayParams.substr(0, 128)
            vo.summary = displayParams
            vo.dbs = dbs
            vo.context = jsonParams
            vo.createTime = now
            vo.recordNum = sf1Resp.total ? sf1Resp.total : 0

            // Save
            vo = await dbRepository.save(vo)        
        }
    } else {
        ctx.state.error = commonStatus.normalize(sf1Resp.status, sf1Resp.message)
        throw new Error(ctx.state.error.message)
    }

    // TODO - 检索条件保存至Session
    // TODO- 检索条件保存至数据库
}
