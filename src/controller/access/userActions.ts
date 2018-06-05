import { Context } from 'koa'
import * as Debug from 'debug'
import { getManager } from "typeorm";
import { User } from "../../entity/user";
import * as moment from 'moment'
import * as jwt from 'jsonwebtoken'
import * as config from 'config'

const debug = Debug('aipatn.register')
const jwtSecret = config.get<string>('jwtSecret')


/**
 * Middleware register
 */
export async function register (ctx: Context, next: Function) {
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

    const usrRepository = getManager().getRepository(User)
    let vo = await usrRepository.findOne({ userName: user.p })
    
    if (vo) {
        throw new Error('该用户已存在！')
    }
    
    // 生成注册用户信息
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    vo = new User()
    vo.userName = user.p
    vo.password = '123456'
    vo.firstName = user.firstName ? user.firstName : ''
    vo.lastName = user.lastName ? user.lastName : ''
    vo.mobile = user.p
    vo.email = user.email ? user.email : ''
    vo.emailVerified = false
    vo.createTime = now
    vo.lastLoginTime = now
    vo.state = 'active'

    // jwt授权, 有效期2天
    // 签发时间
    const issuedAt = moment().valueOf()
    // 失效时间
    const expireAt = moment().add('d', 2).valueOf()
    const jwtToken = await jwt.sign({
        subject: user.p,
        audience: 'api.aipatn.com',
        issuer: 'aipatn.com',
        iat: issuedAt,
        exp: expireAt
    }, jwtSecret)
    vo.jwt = jwtToken

    // 创建用户
    vo = await usrRepository.save(vo)

    delete session.vcode
    session.user.uid = vo.id
    session.user.logged = true
    session.user.jwt = jwtToken

    // TODO - 更新日志

    ctx.state.session = session
    ctx.state.data = { status: 0, message: "恭喜您！注册成功", token: jwtToken }
}