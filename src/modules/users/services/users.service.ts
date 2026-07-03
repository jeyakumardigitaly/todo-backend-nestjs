import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-users.dto';
import { UpdateUserDto } from '../dto/update-users.dto';
UpdateUserDto;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password,10)

    const user = this.userRepository.create({...dto, password:hashedPassword});

    return this.userRepository.save(user);
     
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async findAll():Promise<User[]>{
    return await this.userRepository.find({
        order:{
            createdAt : "DESC"
        }
    })
     
  } 

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);
  }

  async validatePassword(plainPassword:string,hashedPassword:string):Promise<boolean>{
    return bcrypt.compare(plainPassword,hashedPassword)
  }

}
