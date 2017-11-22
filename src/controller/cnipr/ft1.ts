import * as path from 'path';
import * as fs from 'fs';
import { Context } from 'koa'
import Axios from 'axios'
import * as moment from 'moment'
import * as config from 'config'
import { oauth2 } from './auth'
import * as Debug from 'debug'
import { commonStatus } from '../../lib/error';
import { ByteRange } from 'express-serve-static-core';

const debug = Debug('cnipr.ft1')

/**
 * Middleware sf1
 * headers => x-session-id, auth
 * body => exp, dbs, order, option, from, to, displayCols
 */
export async function ft1 (ctx: Context, next: Function) {
    const req = ctx.request;
    debug('req.body: %o', req.query)

    if (!req.query || !req.query.pid) {
        throw new Error('无效的请求')
    }

    const pid = req.query.pid

    const params = oauth2.getApiParams()
    const clientId = params.clientId
    const openId = params.openId
    const accessToken = params.accessToken

    const url = 'https://open.cnipr.com/cnipr-api/rs/api/fulltext/ft1/' + clientId
    let res = await Axios({
        url: url,
        method: 'get',
        params:{
            pid: pid,
            openid: openId,
            access_token: accessToken
        },
        responseType: 'arraybuffer'
    })

    const file = `${pid}.pdf`
    fs.open(path.join(__dirname, file), 'w', function (err, fd) {
        if (err) {
            throw err
        } else {
            debug('res.data = %o', res.headers)

            const buffer = res.data;
            debug('buffer byte length: %d', buffer.byteLength)
            const written = fs.writeSync(fd, buffer, 0, buffer.byteLength, 0)
            debug('written: %d', written)
            
            fs.close(fd, (err) => {
                if (err) throw err
            })
        }
    })

    ctx.state.data = { status: 0, message: "OK", fileUrl: file }
}

