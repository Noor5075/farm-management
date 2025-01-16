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
import { BadRequestException } from '@nestjs/common';
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
  ) {
    return await this.locationService.create(createLocationDto);
  }

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
  
      return this.locationService.findAll(queryObject);
    }

  @Get(':locationId')
  async findOne(@Param('locationId') locationId: string): Promise<Location> {
    return await this.locationService.findOne(locationId);
  }

  @Put(':locationId')
  async update(
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return await this.locationService.update(locationId, updateLocationDto);
  }

  @Patch(":locationId")
  async partialUpdate(
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return await this.locationService.partialUpdate(locationId, updateLocationDto);
  }

  @Delete(':locationId')
  async remove(@Param('locationId') locationId: string): Promise<void> {
    return await this.locationService.remove(locationId);
  }
}
