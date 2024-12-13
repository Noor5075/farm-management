import { Controller, Get, Post, Body, Param, Put, Delete,Query } from '@nestjs/common';
import { PlantingService } from './planting.service';
import { CreatePlantingDto } from './dto/create-planting.dto';
import { UpdatePlantingDto } from './dto/update-planting.dto';
import { Planting } from './entities/planting.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('planting')
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  // Create a new planting record
  @Post()
  async create(@Body() createPlantingDto: CreatePlantingDto): Promise<Planting> {
    return this.plantingService.create(createPlantingDto);
  }

  // Get all planting records
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ): Promise<{
    data: Planting[];
    total: number;
    page?: number;
    limit?: number;
  }> {
    return await this.plantingService.findAll(page, limit);
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

  // Delete a planting record by ID
  @Delete(':plantingId')
  async remove(@Param('plantingId') plantingId: string): Promise<void> {
    return this.plantingService.remove(plantingId);
  }
}








































































// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { PlantingService } from './planting.service';
// import { CreatePlantingDto } from './dto/create-planting.dto';
// import { UpdateFarmLocationDto } from 'src/farm_location/dto/update-farm-location.dto'; 
// import { UpdatePlantingDto } from './dto/update-planting.dto';

// @Controller('planting')
// export class PlantingController {
//   constructor(private readonly plantingService: PlantingService) {}

//   @Post()
//   create(@Body() createPlantingDto: CreatePlantingDto) {
//     return this.plantingService.create(createPlantingDto);
//   }

//   @Get()
//   findAll() {
//     return this.plantingService.findAll();
//   }

//   @Get(':plantingId')
//   findOne(@Param('plantingId') plantingId: number) {
//     return this.plantingService.findOne(plantingId);
//   }

//   @Patch(':plantingId')
//   update(
//     @Param('plantingId') plantingId: number,
//     @Body() updatePlantingDto: UpdatePlantingDto, 
//   ) {
//     return this.plantingService.update(plantingId, updatePlantingDto);
//   }

//   @Delete(':plantingId')
//   remove(@Param('plantingId') plantingId: number) {
//     return this.plantingService.remove(plantingId);
//   }
// }
