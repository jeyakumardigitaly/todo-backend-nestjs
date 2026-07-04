import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Role } from "../../../common/enum/role.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({
        length:100
    })
    name!:string;

    @Column({
        unique:true,
        length:150
    })
    email!:string;

    @Exclude()
    @Column()
    password!:string;

    @Column({
        type:'enum',
        enum:Role,
        default: Role.USER
    })
    role!:Role

    @Column({
         default:true
    })
    isActive!:boolean;

    @Column({
        type:'text',
        nullable: true})
    refreshTokenHash!: string | null;

    @CreateDateColumn({
        name:'created_at'
    })
    createdAt!:Date;

    @UpdateDateColumn({
        name:'updated_at'
    })
    updatedAt!:Date;
}