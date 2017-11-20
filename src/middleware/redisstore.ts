import { Context } from 'koa'
import * as config from 'config'
import * as Redis from 'ioredis'
import * as uuidv4 from 'uuid/v4'

/**
 * 使用Redis实现的Session
 */
class RedisStore {
    private client: Redis.Redis

    private host: string
    private port: number
    private pass: string

    constructor() {
        this.host = config.get<string>('redis.host')
        this.port = config.get<number>('redis.port')
        this.pass = config.get<string>('redis.pass')
        
        this.client = new Redis(this.port, this.host, { password: this.pass })
    }

    /**
     * 生成唯一ID
     */
    getID() {
        return uuidv4()
    }
    
    /**
     * 读取Session值
     * @param sid Session ID
     */
    async get(sid: string, ctx?: Context) {
        let data = await this.client.get(`SESSION:${sid}`)
        return JSON.parse(data)
    }

    /**
     * 设置Session
     * @param session Session值
     * @param sid Session ID
     * @param maxAge 最大存在时间(ms),默认30分钟
     */
    async set(session: any, { sid =  this.getID(), maxAge = 1800000 } = {}, ctx?: Context) {
        try {
/*
            if (!sid) {
                sid = this.getID()
            }
*/            
            // Use redis set EX to automatically drop expired sessions
            await this.client.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000)
        } catch (e) {
        }
        
        return sid;
    }

    /**
     * 移除指定sid的Session
     * @param sid Session ID
     */
    async destroy(sid: string, ctx?: Context) {
        return await this.client.del(`SESSION:${sid}`);
    }
}

export const redisStore =  new RedisStore()