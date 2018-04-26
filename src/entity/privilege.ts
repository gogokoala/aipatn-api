import {Entity, PrimaryColumn, Column} from "typeorm"

@Entity('privilege', {
    engine: 'MyISAM'    
})
export class Privilege {

    //唯一标识
    @PrimaryColumn({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: 'ID'
    })
    id: number = 0;

    //=0，表示该项为模块组。>0, 表示所属模块组的id
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '模块组'
    })
    group: number = 0;

    //名称
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '名称'
    })
    label: string = "";

    //图例
    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '图例'
    })
    img: string = "";

    //页面链接
    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '页面链接'
    })
    href: string = "";

    //功能分类,'0-登录可见','1-服务授权','2-系统管理','3-内部功能'
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '功能分类'
    })
    kind: number = 0;

    //计费方式,'0-不计费','1-按期计费','2-按次计费'
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '计费方式'
    })
    pay: number = 0;
}
