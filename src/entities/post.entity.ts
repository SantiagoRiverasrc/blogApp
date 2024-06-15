import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('posts')
export class Posts{
    @PrimaryGeneratedColumn()
    id_post: number;

    @Column()
    iduser: number;

    @Column({ length: 100})
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn({ type: 'timestamp'})
    date_create: Date

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'iduser' })
    user: User
}