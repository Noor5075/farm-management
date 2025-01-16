import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiFeature } from 'src/utils/apifeature';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto) {
    const newLocation = this.locationRepository.create(createLocationDto);
    return await this.locationRepository.save(newLocation);
  }

  async findAll(queryParams: any) {
      const queryBuilder = this. locationRepository.createQueryBuilder('location');
  
      // Pass parsed filter to ApiFeature
      const apiFeature = new ApiFeature(queryBuilder, queryParams.filter || {});
      apiFeature.filter().paginate();
  
      const data = await apiFeature.getQuery().getMany();
      const total = await queryBuilder.getCount();
  
      return { data, total };
    }

  async findOne(locationId: string): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { locationId },
    });
    if (!location) {
      throw new NotFoundException(`Location with ID ${locationId} not found`);
    }
    return location;
  }

  async update(
    locationId: string,
    updateLocationDto 
  ) {
    const location = await this.findOne(locationId);

    // Merge the existing location with the update data
    const updatedLocation = {
      ...location,
      ...updateLocationDto,
    };

    // Pass the updatedLocation as an array
    await this.locationRepository.save([updatedLocation]);

    return updatedLocation;
  }

  async partialUpdate(locationId: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.findOne(locationId);  // Retrieve the location to update
    
    // Only update the fields present in the updateLocationDto
    Object.assign(location, updateLocationDto);  // Merge the changes with the existing location
    
    // Save the updated location
    return await this.locationRepository.save(location);
  }

  async remove(locationId: string): Promise<void> {
    const location = await this.findOne(locationId);
    await this.locationRepository.remove(location);
  }
}
