import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planting } from './entities/planting.entity';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';
import { ApiFeature } from 'src/utils/apifeature';

@Injectable()
export class PlantingService {
  constructor(
    @InjectRepository(Planting)
    private readonly plantingRepository: Repository<Planting>,
  ) {}

  // Create a new planting record
  async create(
    createPlantingDto: CreatePlantingDto,
    userId: string,
  ): Promise<Planting> {
    const planting = this.plantingRepository.create({
      ...createPlantingDto,
      createdBy: userId,
    });
    return this.plantingRepository.save(planting);
  }

 async findAll(queryParams: any) {
       const queryBuilder = this. plantingRepository.createQueryBuilder('planting');
       // Pass parsed filter to ApiFeature
       const apiFeature = new ApiFeature(queryBuilder, queryParams.filter || {});
       apiFeature.filter().paginate();
   
       const data = await apiFeature.getQuery().getMany();
       const total = await queryBuilder.getCount();
   
       return { data, total };
     }

  // Find one planting record by uniqueId (UUID)
  async findOne(plantingId: string): Promise<Planting> {
    return this.plantingRepository.findOne({
      where: { plantingId: plantingId },
    });
  }

  // Update a planting record by uniqueId (UUID)
  async update(
    plantingId: string,
    updatePlantingDto: UpdatePlantingDto,
  ): Promise<Planting> {
    const planting = await this.plantingRepository.preload({
      plantingId: plantingId,
      ...updatePlantingDto,
    });
    if (!planting) {
      throw new Error('Planting record not found');
    }
    return this.plantingRepository.save(planting);
  }

  async partialUpdate(
    plantingId: string,
    partialUpdateData: Partial<UpdatePlantingDto>,
  ): Promise<Planting> {
    const planting = await this.plantingRepository.findOne({
      where: { plantingId },
    });

    if (!planting) {
      throw new Error('Planting record not found');
    }

    // Merge the existing planting data with the update data
    const updatedPlanting = Object.assign(planting, partialUpdateData);

    // Save the updated planting record
    return this.plantingRepository.save(updatedPlanting);
  }

  // Delete a planting record by uniqueId (UUID)
  async remove(plantingId: string): Promise<void> {
    const planting = await this.findOne(plantingId);
    if (!planting) {
      throw new Error('Planting record not found');
    }
    await this.plantingRepository.remove(planting);
  }
}
