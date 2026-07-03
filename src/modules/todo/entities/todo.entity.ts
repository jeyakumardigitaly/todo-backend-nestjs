import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 100,
  })
  title?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    default: false,
  })
  completed?: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;
}