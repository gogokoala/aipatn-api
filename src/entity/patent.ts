import {Entity, PrimaryColumn, Column} from "typeorm"

@Entity({
    database: 'pat',
    engine: 'MyISAM'    
})
export class Patent {
    //sf1
    @PrimaryColumn({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '专利信息ID'
    })
    pid: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: 'sysid'
    })
    sysid: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '申请号'
    })
    appNumber: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '公开（公告）号'
    })
    pubNumber: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        comment: '申请日'
    })
    appDate: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        comment: '公开（公告）日'
    })
    pubDate: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '名称'
    })
    title: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        comment: '分类号'
    })
    ipc: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '申请（专利权）人'
    })
    applicantName: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '发明（设计）人'
    })
    inventroName: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '优先权'
    })
    priority: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '专利代理机构'
    })
    agencyName: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '代理人'
    })
    agentName: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '省'
    })
    addrProvince: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '市'
    })
    addrCity: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '县'
    })
    addrCounty: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        comment: '地址'
    })
    address: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        comment: '专利类型'
    })
    patType: number

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '国际申请'
    })
    iapp: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '国际公布'
    })
    ipub: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        comment: '进入国家日期'
    })
    den: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '摘要'
    })
    abs: string

    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8mb4_unicode_ci',
        comment: '最新法律状态'
    })
    lprs: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        comment: '摘要附图存储路径'
    })
    draws: string
    
    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        comment: '专利所属库名'
    })
    dbName: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '发布路径'
    })
    tifDistributePath: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        comment: '页数'
    })
    pages: number

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '相似度'
    })
    relevance: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '国省代码'
    })
    proCode: string

    @Column({
        type: 'varchar',
        length: 8,
        collation: 'utf8mb4_unicode_ci',
        comment: '申请国代码'
    })
    appCoun: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '公报发布路径'
    })
    gazettePath: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        comment: '公报所在页'
    })
    gazettePage: number

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        comment: '公报翻页信息'
    })
    gazetteCount: number

    @Column({
        type: 'varchar',
        length: 8,
        collation: 'utf8mb4_unicode_ci',
        comment: '专利状态码'
    })
    statusCode: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '法律状态'
    })
    legalStatus: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '主分类号'
    })
    mainIpc: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '国家资源'
    })
    appResource: string

    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        comment: '同族号'
    })
    familyNo: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '主权项'
    })
    cl: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '关键词'
    })
    patentWords: string

    //sf2
    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '自动摘要'
    })
    autoAbs: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '权利要求书'
    })
    claimsPath: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: ''
    })
    cipPath: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '说明书'
    })
    instrPath: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '说明书附图'
    })
    instrTif: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '审查员'
    })
    censor: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        comment: '参考文献'
    })
    refDoc: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        comment: '优先权日'
    })
    priorityDate: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        comment: '颁证日'
    })
    issueDate: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        comment: '本国主分类号'
    })
    initMainIpc: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        comment: '本国分类号'
    })
    initIpc: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        comment: '分案原申请号'
    })
    divideInitAppNo: string
}
