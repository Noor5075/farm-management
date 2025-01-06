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
import { BadRequestException } from '@nestjs/common';
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
  async login(@Body() loginUserBody: UpdateUserDto) {
    return await this.userService.validateUser(loginUserBody);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @Get()
async findAll(@Query() queryParams: any): Promise<{ data: User[]; total: number }> {
  const { filter, page, limit } = queryParams;

  let parsedFilter;
  try {
    parsedFilter = filter ? JSON.parse(filter) : null;
  } catch (error) {
    throw new BadRequestException('Invalid filter format');
  }

  const queryObject = {
    ...queryParams,
    filter: parsedFilter, // Replace the filter with parsed JSON
  };

  return this.userService.findAll(queryObject);
}


  @Get(':userId')
  async findOne(@Param('userId') userId: number): Promise<User> {
    const user = await this.userService.viewUser(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }
    return user;
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
