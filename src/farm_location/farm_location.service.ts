import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmLocation } from './Enties/farm_location.entity';

@Injectable()
export class FarmLocationService {
  constructor(
    @InjectRepository(FarmLocation)
    private readonly farmRepository: Repository<FarmLocation>,
  ) {}

  async create(farmLocation: FarmLocation): Promise<FarmLocation> {
    return await this.farmRepository.save(farmLocation);
  }

  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    data: FarmLocation[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    if (page && limit) {
      // Paginated query
      const [data, total] = await this.farmRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { data, total, page, limit };
    } else {
      // Non-paginated query
      const data = await this.farmRepository.find();
      return { data, total: data.length };
    }
  }

  viewFarmLocation(farmLocationId: number): Promise<FarmLocation> {
    return this.farmRepository.findOneBy({ farmLocationId });
  }
  updateFarmLocation(farmLocationId: number): Promise<{ affected?: number }> {
    return this.farmRepository.delete(farmLocationId);
  }
}
