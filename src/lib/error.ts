import { start } from "repl";

export interface BaseStatusData {
    status: string
    message: string
    data?: any
}

class CommonStatus {
    private readonly status: Array<BaseStatusData> = [
        { status: '0',   message: 'SUCCESS'},
        { status: '10',  message: '检索结果为空'},
        { status: '401', message: '字段访问权限不足'},
        { status: '402', message: '参数错误'},
        { status: '403', message: '接口或数据库访问权限不足'},
        { status: '405', message: 'from和to参数错误'},
        { status: '406', message: '翻译参数错误'},
        { status: '500', message: '内部错误，请联系管理员'},
        { status: '501', message: '处理翻译数据异常'},
        { status: '502', message: '翻译失败'},
        { status: '505', message: '数据库操作异常'},
        { status: '3005', message: '聚类结果为空'},
        { status: '3006', message: '聚类超时'}
    ]

    private readonly unknownError: BaseStatusData = { status: '-1', message: '未知错误'}

    normalize(status: string | number, message: string) {
        const errCode = typeof status === 'number' ? status.toString() : status
        this.status.forEach(e => {
            if (e.status === errCode) {
                return e
            }
        })

        return { status: errCode, message }
    }
}

export const commonStatus = new CommonStatus()