import {Entity, PrimaryColumn, Column} from "typeorm"

@Entity('patent', {
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
        default: '',
        comment: 'sysid'
    })
    sysid: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '申请号'
    })
    appNumber: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '公开（公告）号'
    })
    pubNumber: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '申请日'
    })
    appDate: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '公开（公告）日'
    })
    pubDate: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '名称'
    })
    title: string

    @Column({
        type: 'simple-array',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '分类号'
    })
    ipc: string[]

    @Column({
        type: 'simple-array',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '申请（专利权）人'
    })
    applicantName: string[]

    @Column({
        type: 'simple-array',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '发明（设计）人'
    })
    inventroName: string[]

    @Column({
        type: 'simple-array',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '优先权'
    })
    priority: string[]

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '专利代理机构'
    })
    agencyName: string

    @Column({
        type: 'simple-array',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '代理人'
    })
    agentName: string

    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '省'
    })
    addrProvince: string

    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '市'
    })
    addrCity: string

    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '县'
    })
    addrCounty: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '地址'
    })
    address: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '专利类型'
    })
    patType: number

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '国际申请'
    })
    iapp: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '国际公布'
    })
    ipub: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '进入国家日期'
    })
    den: string

    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '摘要'
    })
    abs: string

    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '最新法律状态'
    })
    lprs: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '摘要附图存储路径'
    })
    draws: string
    
    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '专利所属库名'
    })
    dbName: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '发布路径'
    })
    tifDistributePath: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '页数'
    })
    pages: number

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '相似度'
    })
    relevance: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '国省代码'
    })
    proCode: string

    @Column({
        type: 'varchar',
        length: 8,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '申请国代码'
    })
    appCoun: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '公报发布路径'
    })
    gazettePath: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '公报所在页'
    })
    gazettePage: number

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '公报翻页信息'
    })
    gazetteCount: number

    @Column({
        type: 'varchar',
        length: 8,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '专利状态码'
    })
    statusCode: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '法律状态'
    })
    legalStatus: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '主分类号'
    })
    mainIpc: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '国家资源'
    })
    appResource: string

    @Column({
        type: 'varchar',
        length: 64,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '同族号'
    })
    familyNo: string

    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '主权项'
    })
    cl: string

    @Column({
        type: 'text',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '关键词'
    })
    patentWords: string

    //sf2
    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '自动摘要'
    })
    autoAbs: string

    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '权利要求书'
    })
    claimsPath: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: ''
    })
    cipPath: string

    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '说明书'
    })
    instrPath: string

    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '说明书附图'
    })
    instrTif: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '审查员'
    })
    censor: string

    @Column({
        type: 'mediumtext',
        collation: 'utf8mb4_unicode_ci',
        nullable: true,
        comment: '参考文献'
    })
    refDoc: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '优先权日'
    })
    priorityDate: string

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '颁证日'
    })
    issueDate: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '本国主分类号'
    })
    initMainIpc: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '本国分类号'
    })
    initIpc: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '分案原申请号'
    })
    divideInitAppNo: string
}
