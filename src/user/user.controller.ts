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
import { Public } from 'src/auth/public';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Public()
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.userService.validateUser(username, password);
  }

  @Post()
  @Public()
  async create(@Body() createUserDto): Promise<User> {
    return this.userService.create(createUserDto);
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
