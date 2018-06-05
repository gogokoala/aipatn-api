import { Context } from 'koa'
import * as config from 'config'
import * as Redis from 'ioredis'
import * as uuidv4 from 'uuid/v4'

/**
 * 使用Redis实现的value
 */
export class RedisStore {
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
     * 读取value值
     * @param key
     */
    async get(key: string) {
        let result: any

        if (key) {
            let data = await this.client.get(key)
            result = JSON.parse(data)
        } else {
            result = undefined
        }
        return result;
    }

    /**
     * 设置value
     * @param value value值
     * @param key Unique ID
     * @param maxAge 最大存在时间(s),默认30分钟
     */
    async set(key: string, value: any, { maxAge = 1800 } = {}) {
        try {
            if (!key) {
                key = this.getID()
            }
            
            // Use redis set EX to automatically drop expired values
            await this.client.set(key, JSON.stringify(value), 'EX', maxAge)
        } catch (e) {
        }
        
        return key;
    }

    /**
     * 移除指定key的value
     * @param key value ID
     */
    async destroy(key: string) {
        return await this.client.del(key);
    }
}
