import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm"
import { ACL } from "./acl";
import { Profile } from "./profile";

@Entity('user', {
    engine: 'MyISAM'    
})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    password: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    email: string

    @Column({
        collation: 'utf8mb4_unicode_ci',
        default: false
    })
    emailVerified: boolean

    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    mobile: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    createTime: string

    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    lastLoginTime: string
    
    @Column({
        type: 'varchar',
        length: 16,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    state: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci',
        default: ''
    })
    jwt: string

    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci',
        default: 0,
        comment: '特殊用户标识'
    })
    spec: number        

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;
    
    @OneToMany(type => ACL, acl => acl.user)
    acls: ACL[];

}