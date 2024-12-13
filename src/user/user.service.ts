import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PlantingService } from 'src/planting/planting.service';
import { FarmLocationService } from 'src/farm_location/farm_location.service';

@Injectable()
export class UserService {
  constructor(
    private readonly plantingService: PlantingService,
    private readonly farmLocationService: FarmLocationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    username: string,
    password: string,
    admin: boolean,
  ): Promise<User> {
    const user = this.userRepository.create({ username, password, admin });
    return this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
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
  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
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

  viewUser(userId: number): Promise<User> {
    return this.userRepository.findOneBy({ userId });
  }

  updateUser(userId: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(userId);
  }
}
