import * as Router from 'koa-router'

import { getSessionId } from './controller/session-id'
import { ping } from './controller/ping'
import { getVerificationCode } from './controller/vcode'
import { login } from './controller/login'
import { register } from './controller/register'
import { sf1 } from './controller/cnipr/sf1'
import { sf2 } from './controller/cnipr/sf2'
import { ft1 } from './controller/cnipr/ft1'


/**
 * All application routes.
 */
export const router = new Router()

router.get('/ping', ping)

router.get('/sid', getSessionId)

router.get('/vcode', getVerificationCode)

router.post('/register', register)

router.post('/login', login)

router.post('/sf1', sf1)

router.post('/sf2', sf2)

router.post('/ft1', ft1)
