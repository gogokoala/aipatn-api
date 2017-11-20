import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class Sf1History {

    @PrimaryGeneratedColumn()
    id: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    uid: string

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    title: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci'
    })
    summary: string

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci'
    })
    dbs: string

    @Column({
        type: 'varchar',
        length: 2000,
        collation: 'utf8mb4_unicode_ci'
    })
    context: string
    
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    createTime: string
    
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci'
    })
    recordNum: number    
}