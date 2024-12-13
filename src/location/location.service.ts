import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const newLocation = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(newLocation);
  }

  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{ data: Location[]; total: number; page?: number; limit?: number }> {
    if (page && limit) {
      // Paginated query
      const [data, total] = await this.locationRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { data, total, page, limit };
    } else {
      // Non-paginated query
      const data = await this.locationRepository.find();
      return { data, total: data.length };
    }
  }  

  async findOne(locationId: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { locationId },
    });
    if (!location) {
      throw new NotFoundException(`Location with ID ${locationId} not found`);
    }
    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const location = await this.findOne(id);

    const updatedLocation = {
      ...location,
      ...updateLocationDto,
    };

    await this.locationRepository.save(updatedLocation);
    return updatedLocation;
  }

  async remove(locationId: number): Promise<void> {
    const location = await this.findOne(locationId);
    await this.locationRepository.remove(location);
  }
}
