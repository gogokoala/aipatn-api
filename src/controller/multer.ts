import { Context } from "koa";
import * as multer from "../lib/multerUtil";

import * as Debug from 'debug'
const debug = Debug('aipatn.multer')

/**
 * Middleware upload
 */
export async function multerService(ctx: Context, next: Function) {

  //multer有single()中的名称必须是表单上传字段的name名称。
  multer.single('files');

  debug(ctx.request.files);
    
  ctx.state.data = { status: 0, message: 'ok' }
}
