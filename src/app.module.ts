import { Module } from '@nestjs/common';
import { FarmLocationModule } from './farm_location/farm_location.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmLocation } from './farm_location/Enties/farm_location.entity';
import { PlantingModule } from './planting/planting.module';
import { Planting } from './planting/entities/planting.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { LocationModule } from './location/location.module';
import { Location } from './location/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'noorkhalid@123',
      username: 'postgres',
      entities: [FarmLocation, Planting, User, Location],
      database: 'farm_db',
      synchronize: true,
    }),
    FarmLocationModule,
    PlantingModule,
    UserModule,
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
