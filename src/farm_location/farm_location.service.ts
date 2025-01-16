import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmLocation } from './Enties/farm_location.entity';
import { ApiFeature } from 'src/utils/apifeature';

@Injectable()
export class FarmLocationService {
  constructor(
    @InjectRepository(FarmLocation)
    private readonly farmRepository: Repository<FarmLocation>,
  ) {}

  async create(farmLocation: FarmLocation): Promise<FarmLocation> {
    return await this.farmRepository.save(farmLocation);
  }

  async findAll(queryParams: any) {
    const queryBuilder = this.farmRepository.createQueryBuilder('FarmLocation');

    // Pass parsed filter to ApiFeature
    const apiFeature = new ApiFeature(queryBuilder, queryParams.filter || {});
    apiFeature.filter().paginate();

    const data = await apiFeature.getQuery().getMany();
    const total = await queryBuilder.getCount();

    return { data, total };
  }

  viewFarmLocation(farmLocationId: string): Promise<FarmLocation> {
    return this.farmRepository.findOneBy({ farmLocationId });
  }
  // updateFarmLocation(farmLocationId: number): Promise<{ affected?: number }> {
  //   return this.farmRepository.delete(farmLocationId);
  // }
  async updateFarmLocation(
    farmLocationId: string,
    updateData: Partial<FarmLocation>,
    updatedBy: string,
  ): Promise<FarmLocation> {
    const existingFarmLocation = await this.farmRepository.findOne({
      where: { farmLocationId },
    });

    if (!existingFarmLocation) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }

    // Update fields including updatedBy and updatedAt
    const updatedFarmLocation = Object.assign(
      existingFarmLocation,
      updateData,
      {
        updatedBy,
        updatedAt: new Date(),
      },
    );

    return await this.farmRepository.save(updatedFarmLocation);
  }

  // Partial update for farm location
  async patchFarmLocation(
    farmLocationId: string,
    updateData: Partial<FarmLocation>,
  ): Promise<FarmLocation> {
    const existingFarmLocation = await this.farmRepository.findOne({
      where: { farmLocationId },
    });
    if (!existingFarmLocation) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }
    // Update only the fields provided in the updateData
    const updatedFarmLocation = Object.assign(existingFarmLocation, updateData);
    // Optionally, you can add audit fields, such as updatedBy, updatedAt
    updatedFarmLocation.updatedAt = new Date();
    // Save and return the updated location
    return await this.farmRepository.save(updatedFarmLocation);
  }

  async deleteFarmLocation(
    farmLocationId: number,
  ): Promise<{ affected?: number }> {
    return this.farmRepository.delete(farmLocationId);
  }
}
