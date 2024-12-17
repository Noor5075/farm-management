import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmLocation } from './farm_location/Enties/farm_location.entity';
import { FarmLocationModule } from './farm_location/farm_location.module';
import { Location } from './location/entities/location.entity';
import { LocationModule } from './location/location.module';
import { Planting } from './planting/entities/planting.entity';
import { PlantingModule } from './planting/planting.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

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
      logging: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Hello_key',
      signOptions: { expiresIn: '60m' },
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
