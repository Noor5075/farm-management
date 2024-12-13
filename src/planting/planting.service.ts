import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planting } from './entities/planting.entity';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';

@Injectable()
export class PlantingService {
  constructor(
    @InjectRepository(Planting)
    private readonly plantingRepository: Repository<Planting>,
  ) {}

  // Create a new planting record
  async create(createPlantingDto: CreatePlantingDto): Promise<Planting> {
    const planting = this.plantingRepository.create(createPlantingDto);
    return this.plantingRepository.save(planting);
  }

  // Find all planting records
  async findAll(
    page?: number,
    limit?: number,
  ): Promise<{
    data: Planting[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    if (page && limit) {
      // Paginated query
      const [data, total] = await this.plantingRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return { data, total, page, limit };
    } else {
      // Non-paginated query
      const data = await this.plantingRepository.find();
      return { data, total: data.length };
    }
  }

  // Find one planting record by uniqueId (UUID)
  async findOne(plantingId: string): Promise<Planting> {
    return this.plantingRepository.findOne({ where: { plantingId: plantingId } });
  }

  // Update a planting record by uniqueId (UUID)
  async update(plantingId: string, updatePlantingDto: UpdatePlantingDto): Promise<Planting> {
    const planting = await this.plantingRepository.preload({
      plantingId: plantingId,
      ...updatePlantingDto,
    });
    if (!planting) {
      throw new Error('Planting record not found');
    }
    return this.plantingRepository.save(planting);
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
