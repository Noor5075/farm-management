import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmLocation } from './Enties/farm_location.entity';
import { FarmLocationController } from './farm_location.controllers';
import { FarmLocationService } from './farm_location.service';

@Module({
  imports: [TypeOrmModule.forFeature([FarmLocation])],
  controllers: [FarmLocationController],
  providers: [FarmLocationService],
  exports: [FarmLocationService],
})
export class FarmLocationModule {}
