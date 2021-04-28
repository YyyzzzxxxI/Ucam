import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository: Repository<Users>
  ) {
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<Users> {
    return this.usersRepository.findOne({username: username});
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
      return {username: user.username}
    } catch (e) {
      return {
        message: e
      }
    }
  }
}
