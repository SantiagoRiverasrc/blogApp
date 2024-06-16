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

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
}