import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return await this.locationService.create(createLocationDto);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ): Promise<{
    data: Location[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    return await this.locationService.findAll(page, limit);
  }

  @Get(':locationId')
  async findOne(@Param('locationId') locationId: number): Promise<Location> {
    return await this.locationService.findOne(locationId);
  }

  @Put(':locationId')
  async update(
    @Param('locationId') locationId: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return await this.locationService.update(locationId, updateLocationDto);
  }

  @Delete(':locationId')
  async remove(@Param('locationId') locationId: number): Promise<void> {
    return await this.locationService.remove(locationId);
  }
}
