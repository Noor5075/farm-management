import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { FarmLocationService } from './farm_location.service';
import { CreateFarmLocationDto } from './dto/create-farm-location.dto';
import { FarmLocation } from './Enties/farm_location.entity';
import { ParseIntPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

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
    console.log('Received userId:', createFarmLocationDto.userId);
    farmLocation.userId = createFarmLocationDto.userId;
    return this.farmLocationService.create(farmLocation);
  }

  // @Get to find all the locations
  // Paginated query
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

    return this.farmLocationService.findAll(queryObject);
  }

  @Patch(':farmLocationId')
  async partialUpdate(
    @Param('farmLocationId') farmLocationId: string,
    @Body() updateData: Partial<CreateFarmLocationDto>,
  ): Promise<FarmLocation> {
    const existingFarmLocation =
      await this.farmLocationService.viewFarmLocation(farmLocationId);
    if (!existingFarmLocation) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }
    // Update only the fields provided in the request
    const updatedFarmLocation = Object.assign(existingFarmLocation, updateData);
    // Save the updated location
    await this.farmLocationService.create(updatedFarmLocation);
    return updatedFarmLocation;
  }

  @Get(':farmLocationId')
  async findOne(
    @Param('farmLocationId') farmLocationId: string,
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
    @Param('farmLocationId') farmLocationId: string,
    @Body() updateData: Partial<CreateFarmLocationDto>,
  ): Promise<FarmLocation> {
    const existingFarmLocation =
      await this.farmLocationService.viewFarmLocation(farmLocationId);
    if (!existingFarmLocation) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }
    const updatedBy = 'user'; // Replace with actual user from request context
    const updatedFarmLocation =
      await this.farmLocationService.updateFarmLocation(
        farmLocationId,
        updateData,
        updatedBy,
      );

    await this.farmLocationService.create(updatedFarmLocation);
    return updatedFarmLocation;
  }

  @Delete(':farmLocationId')
  async remove(
    @Param('farmLocationId') farmLocationId: number,
  ): Promise<{ message: string }> {
    const result =
      await this.farmLocationService.deleteFarmLocation(farmLocationId); // Use deleteFarmLocation here
    if (result.affected === 0) {
      throw new Error(`Farm location with id ${farmLocationId} not found.`);
    }
    return {
      message: `Farm location with id ${farmLocationId} deleted successfully.`,
    };
  }
}
