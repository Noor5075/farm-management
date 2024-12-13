import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantingService } from './planting.service';
import { PlantingController } from './planting.contrller';
import { Planting } from './entities/planting.entity';
import { User } from 'src/user/entities/user.entity';
import { Location } from 'src/location/entities/location.entity';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planting, User, Location]),
    LocationModule,
  ],
  controllers: [PlantingController],
  providers: [PlantingService],
  exports: [PlantingService],
})
export class PlantingModule {}

