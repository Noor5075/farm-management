import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PlantingService } from 'src/planting/planting.service';
import { FarmLocationService } from 'src/farm_location/farm_location.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly plantingService: PlantingService,
    private readonly farmLocationService: FarmLocationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto) {
    if (!body?.email) return { message: 'Email is required' };
    if (!body?.password) return { message: 'Password is not provided' };

    const isEmailAlreadyRegister = await this.userRepository.findOne({
      where: { email: body?.email },
    });

    if (isEmailAlreadyRegister)
      throw new BadRequestException('User is Already Register to System');

    const hash = await bcrypt.hash(body?.password, 10);
    const user = this.userRepository.create({ ...body, password: hash });
    const userObject = this.userRepository.save(user);
    return userObject;
  }

  async validateUser(loginUserBody: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginUserBody?.email },
    });

    if (!user)
      throw new NotFoundException(
        'User is not register against the email or user',
      );
    //decrypt

    const isValidPassword = await bcrypt.compare(
      loginUserBody?.password,
      user?.password,
    );

    const { password, ...rest } = user;

    if (isValidPassword) {
      const payload = { sub: user.userId, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { user: rest, accessToken };
    } else {
      throw new NotAcceptableException(
        'Invalid Password, Password is not acceptable',
      );
    }
  }

  async getUserWithPlantingAndFarmLocation(userId: number) {
    const plantings = await this.plantingService.findAll();
    const locations = await this.farmLocationService.findAll();
    return {
      userId,
      plantings,
      locations,
    };
  }

  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    data: User[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    if (page && limit) {
      // Paginated query
      const [data, total] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { data, total, page, limit };
    } else {
      // Non-paginated query
      const data = await this.userRepository.find();
      return { data, total: data.length };
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  viewUser(userId: number): Promise<User> {
    return this.userRepository.findOneBy({ userId });
  }

  updateUser(userId: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(userId);
  }
}
