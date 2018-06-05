import {Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne} from "typeorm"
import { User } from "./user";
import { Privilege } from "./privilege";

@Entity('acl', {
    engine: 'MyISAM'    
})
export class ACL {

    @PrimaryGeneratedColumn()
    id: number = 0;

    // 激活状态 0-未启用或已停用或已过期
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '激活状态'
    })
    activeState: number = 0;

    // 剩余使用次数
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '剩余使用次数'
    })
    remainTimes: number = 0;

    // 失效日期
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '失效日期'
    })
    expireData: string = "";

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    updateTime: string = "";

    @ManyToOne(type => User, user => user.acls)
    @JoinColumn()
    user: User = new User;

    @OneToOne(type => Privilege)
    @JoinColumn()
    privilege: Privilege = new Privilege;
}
