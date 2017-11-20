import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uid: string

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
        default: 'active'
    })
    state: string
}