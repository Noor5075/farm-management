import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Planting } from 'src/planting/entities/planting.entity';
import { FarmLocation } from 'src/farm_location/Enties/farm_location.entity';
import { PlantingModule } from 'src/planting/planting.module';
import { FarmLocationModule } from 'src/farm_location/farm_location.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),PlantingModule,FarmLocationModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
