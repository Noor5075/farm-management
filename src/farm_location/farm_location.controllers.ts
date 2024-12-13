import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { FarmLocationService } from './farm_location.service';
import { CreateFarmLocationDto } from './dto/create-farm-location.dto';
import { FarmLocation } from './Enties/farm_location.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('farm-location')
export class FarmLocationController {
  constructor(private readonly farmLocationService: FarmLocationService) {}

  @Post()
  async create(
    @Body() createFarmLocationDto: CreateFarmLocationDto,
  ): Promise<FarmLocation> {
    const farmLocation = new FarmLocation();
    farmLocation.name = createFarmLocationDto.name;
    farmLocation.area = createFarmLocationDto.area;
    farmLocation.type = createFarmLocationDto.type;
    farmLocation.soilType = createFarmLocationDto.soilType;
    farmLocation.boundaries = createFarmLocationDto.boundaries || '';

    // action is a string, not an array
    if (createFarmLocationDto.action) {
      farmLocation.action = createFarmLocationDto.action;
    } else {
      farmLocation.action = ''; // Default to an empty string if not provided
    }
    return this.farmLocationService.create(farmLocation);
  }

  // @Get to find all the locations
  // Paginated query
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ): Promise<{
    data: FarmLocation[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    return await this.farmLocationService.findAll(page, limit);
  }

  @Get(':farmLocationId')
  async findOne(
    @Param('farmLocationId') farmLocationId: number,
  ): Promise<FarmLocation> {
    const farmLocation =
      await this.farmLocationService.viewFarmLocation(farmLocationId);
    if (!farmLocation) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }
    return farmLocation;
  }

  @Put(':farmLocationId')
  async update(
    @Param('farmLocationId') farmLocationId: number,
    @Body() updateData: Partial<CreateFarmLocationDto>,
  ): Promise<FarmLocation> {
    const existingFarmLocation =
      await this.farmLocationService.viewFarmLocation(farmLocationId);
    if (!existingFarmLocation) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }

    const updatedFarmLocation = Object.assign(existingFarmLocation, {
      name: updateData.name ?? existingFarmLocation.name,
      area: updateData.area ?? existingFarmLocation.area,
      type: updateData.type ?? existingFarmLocation.type,
      soilType: updateData.soilType ?? existingFarmLocation.soilType,
      boundaries: updateData.boundaries ?? existingFarmLocation.boundaries,
      action: updateData.action
        ? [updateData.action]
        : existingFarmLocation.action,
    });

    await this.farmLocationService.create(updatedFarmLocation);
    return updatedFarmLocation;
  }

  @Delete(':farmLocationId')
  async remove(
    @Param('farmLocationId') farmLocationId: number,
  ): Promise<{ message: string }> {
    const result =
      await this.farmLocationService.updateFarmLocation(farmLocationId);
    if (result.affected === 0) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }
    return {
      message: `Farm location with id ${farmLocationId} deleted successfully.`,
    };
  }
}
