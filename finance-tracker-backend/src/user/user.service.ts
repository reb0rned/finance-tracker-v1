import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from "argon2";


@Injectable()
export class UserService {
  constructor(
    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })

    if (isUserExist) throw new BadRequestException('User already exist!') 

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password)
    })

    return { user }
  }


  findOne(id: number) {
    return `Here is your user: ${id}`;
  }
}
