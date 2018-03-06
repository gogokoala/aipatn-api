import { Context } from "koa";

import * as Debug from "debug";
const debug = Debug("aipatn.upload");

import * as multer from "multer";

//const upload = multer({ dest: "uploads/" });

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ storage: storage });

/**
 * Middleware upload
 */
export async function uploadService(ctx: Context, next: Function) {
  debug("upload");

  upload.single();
  //    ctx.state.session.ping = 'pong'
  //    ctx.state.data = { status: 0, message: "pong" }
}
