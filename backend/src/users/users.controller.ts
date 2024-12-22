import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/users/User.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('managers')
  async findAllManagers(): Promise<User[]> {
    return this.usersService.findAllManagers();
  }

  @Get('id/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
