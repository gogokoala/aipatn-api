import * as Router from 'koa-router'

import { getSessionId } from './controller/session-id'
import { ping } from './controller/ping'
import { getVerificationCode } from './controller/vcode'
import { login } from './controller/login'
import { register } from './controller/register'
import { sf1 } from './controller/cnipr/sf1'
import { sf2 } from './controller/cnipr/sf2'
import { ft1 } from './controller/cnipr/ft1'
//import { uploadService } from './controller/upload';


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

router.get('/sf2', sf2)

router.get('/ft1', ft1)

//router.post('/upload', uploadService)

/**
 * User Actions
 */
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.get("/user/findOne", userFindOne);
router.get("/user/count", userCount);

router.head("/user/:id", isUserExists);

router.post("/user", createNewUser);
router.post("/user/update", updateUsers);

router.put("/user", updateOrCreateUser);
router.put("/user/:id", updateUserById);

router.delete("/user/:id", deleteUserById);
