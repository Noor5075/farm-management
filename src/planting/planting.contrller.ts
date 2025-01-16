import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { PlantingService } from './planting.service';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';
import { Planting } from './entities/planting.entity';
import { ParseIntPipe } from '@nestjs/common';
import { Public } from 'src/auth/public';
import { BadRequestException } from '@nestjs/common';

@Controller('planting')
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  // Create a new planting record
  @Post()
  async create(
    @Body() createPlantingDto: CreatePlantingDto,
    @Body('userId') userId: string,
  ): Promise<Planting> {
    return this.plantingService.create(createPlantingDto, userId);
  }

  // Get all planting records
  @Get()
  async findAll(
    @Query() queryParams: any,
  ): Promise<{ data: Location[]; total: number }> {
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

    return this.plantingService.findAll(queryObject);
  }

  // Get a single planting record by ID
  @Get(':plantingId')
  async findOne(@Param('plantingId') plantingId: string): Promise<Planting> {
    return this.plantingService.findOne(plantingId);
  }

  // Update a planting record by ID
  @Put(':plantingId')
  async update(
    @Param('plantingId') plantingId: string,
    @Body() updatePlantingDto: UpdatePlantingDto,
  ): Promise<Planting> {
    return this.plantingService.update(plantingId, updatePlantingDto);
  }

  @Patch(':plantingId')
  async partialUpdate(
    @Param('plantingId') plantingId: string,
    @Body() partialUpdateData: Partial<UpdatePlantingDto>,
  ): Promise<Planting> {
    return this.plantingService.partialUpdate(plantingId, partialUpdateData);
  }

  // Delete a planting record by ID
  @Delete(':plantingId')
  async remove(@Param('plantingId') plantingId: string): Promise<void> {
    return this.plantingService.remove(plantingId);
  }
}
