import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRoles } from 'src/commons/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findAllManagers(): Promise<User[]> {
    return this.userRepository.find({ where: { role: UserRoles.Manager } });
  }

  findOne(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['manager', 'managedUsers', 'reports'],
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['manager', 'reports', 'managedUsers', 'managedUsers.reports'],
    });
    if (!user) {
      throw new NotFoundException(`Employee with email ${email} not found`);
    }
    return user;
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
