import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./post.entity";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ length: 50})
    name_user: string;

    @Column({ length: 50})
    email: string;

    @Column({ length: 160})
    pass: string;

    @Column({
        type:'varchar',
        length: 170,
        default: 'https://i.pinimg.com/736x/06/a1/5a/06a15a563818f8a5931aa0805ba24a4c.jpg'
    })
    img: string;

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
}