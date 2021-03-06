import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('user', {
    engine: 'MyISAM'    
})
export class Profile {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({
        type: 'varchar',
        length: 10,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '性别'
    })
    gender: string = "";

    @Column({
        type: 'varchar',
        length: 255,
        collation: 'utf8mb4_unicode_ci',
        default: '',
        comment: '头像链接'
    })
    photo: string = "";

}