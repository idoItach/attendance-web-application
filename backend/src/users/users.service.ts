import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['manager', 'managedUsers'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let manager: User = null;
    if (createUserDto.managerId) {
      manager = await this.userRepository.findOne({
        where: { id: createUserDto.managerId },
      });
      if (!manager) {
        throw new NotFoundException(
          `Manager with ID ${createUserDto.managerId} not found`,
        );
      }
    }
    const newUser = this.userRepository.create({
      ...createUserDto,
      manager,
    });
    return this.userRepository.save(newUser);
  }
}
