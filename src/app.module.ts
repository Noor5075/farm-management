import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT'), 10),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [FarmLocation, Planting, User, Location],
          synchronize: true,
          logging: true,
        };
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('Hello_key'),
        signOptions: { expiresIn: configService.get<string>('1h') },
      }),
    }),
    FarmLocationModule,
    PlantingModule,
    UserModule,
    LocationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService
  ],
})
export class AppModule {}
