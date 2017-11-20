import { Context } from 'koa'
import { redisStore } from '../middleware/redisstore'
import * as moment from 'moment'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'
import * as Debug from 'debug'
import { getManager } from "typeorm"
import { User } from "../entity/user"

const debug = Debug('aipatn.register')
const jwtSecret = config.get<string>('jwtSecret')

/**
 * Middleware login
 * headers => x-session-id
 * body => phone, vcode
 */
export async function login (ctx: Context, next: Function) {
    const req = ctx.request;
    const user = req.body;
    debug('req.body: %o', req.body)

    if (!user || !user.p || !user.vc) {
        throw new Error('无效的请求！')
    }

    let session = ctx.state.session
    if (!session.vcode) {
        throw new Error('请获取验证码！')
    }

    if (moment().valueOf() >= session.vcode.expireAt) {
        throw new Error('验证码已过期。请重新获取验证码！')
    }

    if (user.p != session.vcode.phone || user.vc != session.vcode.code) {
        throw new Error('验证码错误！')
    }
    
    // 验证用户
    const usrRepository = getManager().getRepository(User)
    let vo = await usrRepository.findOne({ userName: user.p })
    
    if (!vo) {
        throw new Error('用户不存在')
    }

    if (vo.state !== 'active') {
        throw new Error('您的用户因某些原因被锁定！请联系管理员恢复。')
    }

    // jwt
    let jwtToken
    if (session.user && session.user.jwt) {
        jwtToken = session.user.jwt
    } else {
        jwtToken = vo.jwt
    }

    if (jwtToken) {
        // 校验jwt
        try {
            const jwtDecoded = await jwt.verify(jwtToken, jwtSecret, { 
                subject: user.p,
                audience: 'api.aipatn.com',
                issuer: 'aipatn.com'
            });
            debug('jwt decoded: %o', jwtDecoded)
        } catch(e) {
            // 无效jwt
            jwtToken = ''
        }
    }
    
    if (!jwtToken) {
        // jwt授权, 有效期2天
        // 签发时间
        const issuedAt = moment().valueOf()
        // 失效时间
        const expireAt = moment().add('d', 2).valueOf()
        jwtToken = await jwt.sign({
            subject: user.p,
            audience: 'api.aipatn.com',
            issuer: 'aipatn.com',
            iat: issuedAt,
            exp: expireAt
        }, jwtSecret)
    }

    vo.jwt = jwtToken
    session.user.jwt = jwtToken

    // 更新用户信息
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    vo.lastLoginTime = now

    vo = await usrRepository.save(vo)

    // 更新Session
    delete session.vcode

    // TODO - 更新日志
    
    ctx.state.session = session
    ctx.state.data = { status: 0, message: "登录成功", token: jwtToken }
}