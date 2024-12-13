import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.admin = createUserDto.admin;
    return this.userService.create(user);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ): Promise<{
    data: User[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    return await this.userService.findAll(page, limit);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<User> {
    const user = await this.userService.viewUser(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }
    return user;
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.userService.viewUser(userId);
    if (!existingUser) {
      throw new Error(`User with id ${userId} not found.`);
    }

    const updatedUser = Object.assign(existingUser, updateUserDto);

    await this.userService.create(updatedUser);
    return updatedUser;
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: number): Promise<{ message: string }> {
    const result = await this.userService.updateUser(userId);
    if (result.affected === 0) {
      throw new Error(`User with id ${userId} not found.`);
    }
    return { message: `User with id ${userId} deleted successfully.` };
  }
}
