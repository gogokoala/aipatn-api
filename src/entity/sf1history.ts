import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity('sf1_history', {
    engine: 'MyISAM'    
})
export class Sf1History {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    uid: string = ''

    @Column({
        type: 'varchar',
        length: 128,
        collation: 'utf8mb4_unicode_ci'
    })
    title: string = ''

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci'
    })
    summary: string = ''

    @Column({
        type: 'varchar',
        length: 256,
        collation: 'utf8mb4_unicode_ci'
    })
    dbs: string = ''

    @Column({
        type: 'varchar',
        length: 2000,
        collation: 'utf8mb4_unicode_ci'
    })
    context: string = ''
    
    @Column({
        type: 'varchar',
        length: 32,
        collation: 'utf8mb4_unicode_ci'
    })
    createTime: string = ''
    
    @Column({
        type: 'int',
        collation: 'utf8mb4_unicode_ci'
    })
    recordNum: number = 0
}