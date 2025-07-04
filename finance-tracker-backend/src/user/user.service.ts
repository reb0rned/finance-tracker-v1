import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(
    // @ts-ignore
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUserExist = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })

    if (isUserExist) throw new BadRequestException('cannot create user...') 

    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password)
    })

    const token = this.jwtService.sign({ email: createUserDto.email })

    return { user, token }
  }


  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }
}
