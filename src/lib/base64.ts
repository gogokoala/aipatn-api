import * as crypto from "crypto"

export function decodeBase64 (message: string) {
    const dec = crypto.createDecipher('base64', '')
    return dec.update(message, 'base64', 'utf8')
}