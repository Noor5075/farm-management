import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { PlantingService } from 'src/planting/planting.service';
import { FarmLocationService } from 'src/farm_location/farm_location.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ApiFeature } from 'src/utils/apifeature';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

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

  async validateUser(loginUserBody: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginUserBody?.username },
    });

    if (!user)
      throw new NotFoundException(
        'User is not register against the email or user',
      );

    if (!loginUserBody?.password) {
      throw new BadRequestException(' password missing');
    }

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

  async getUserWithPlantingAndFarmLocation(userId: string) {
    const plantings = await this.plantingService.findAll({});
    const locations = await this.farmLocationService.findAll({});
    return {
      userId,
      plantings,
      locations,
    };
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Merge the updates into the existing user
    const updatedUser = this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(updatedUser); // Save and return the updated user
  }

  async findAll(queryParams: any) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    // Pass parsed filter to ApiFeature
    const apiFeature = new ApiFeature(queryBuilder, queryParams.filter || {});
    apiFeature.filter().paginate();

    const data = await apiFeature.getQuery().getMany();
    const total = await queryBuilder.getCount();

    return { data, total };
  }

  async updatePartialUser(
    userId: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Merge the updates into the existing user
    const updatedUser = this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(updatedUser); // Save and return the updated user
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  viewUser(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ userId });
  }

  async deleteUser(userId: string) {
    return this.userRepository.delete(userId);
  }
}
