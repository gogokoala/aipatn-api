import { BaseStatusData } from '../../lib/error'

export interface sf1Data {
    pid: string
    sysid: string
    appNumber: string
    pubNumber: string
    appDate: string
    pubDate: string
    title: string
    ipc: Array<string>
    applicantName: Array<string>
    inventroName: Array<string>
    priority: string
    agencyName: Array<string>
    agentName: string
    addrProvince: string
    addrCity: string
    addrCounty: string
    address: string
    patType: string
    iapp: string
    ipub: string
    den: string
    abs: string
    lprs: string
    dbName: string
    tifDistributePath: string
    pages: string
    relevance: string
    proCode: string
    appCoun: string
    gazettePath: string
    gazettePage: string
    gazetteCount: string
    statusCode: string
    familyNo: string
}

export interface sectionInfo {
    sectionName: string
    recordNum: number
}

export interface sf1Response extends BaseStatusData {
    total?: number
    from?: number
    to?: number
    results?: Array<PatentInfo>
    sectionInfos?: Array<sectionInfo>
}

export interface PatentInfo {
    //sf1
    pid: string
    sysid: string
    appNumber: string
    pubNumber: string
    appDate: string
    pubDate: string
    title: string
    ipc: Array<string>
    applicantName: Array<string>
    inventroName: Array<string>
    priority: string
    agencyName: Array<string>
    agentName: string
    addrProvince: string
    addrCity: string
    addrCounty: string
    address: string
    patType: string
    iapp: string
    ipub: string
    den: string
    abs: string
    lprs: string
    dbName: string
    tifDistributePath: string
    pages: string
    relevance: string
    proCode: string
    appCoun: string
    gazettePath: string
    gazettePage: string
    gazetteCount: string
    statusCode: string
    familyNo: string
    //sf2
    cl: string
    patentWords: string
    autoAbs: string
    claimsPath: string
    cipPath: string
    instrPath: string
    instrTif: string
    censor: string
    refDoc: string
    priorityDate: string
    issueDate: string
    initMainIpc: string
    initIpc: string
    divideInitAppNo: string
}
