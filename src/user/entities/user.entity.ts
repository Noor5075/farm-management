import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { FarmLocation } from 'src/farm_location/Enties/farm_location.entity';
import { Planting } from 'src/planting/entities/planting.entity';

import * as crypto from 'crypto';

const SECRET_KEY = 'Hello_key';
const ALGORITHM = 'aes-256-cbc'; // AES encryption algorithm
const IV_LENGTH = 16; // Length of IV (Initialization Vector)

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @Column()
  username: string;

  @Column({ default: '', unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany(() => FarmLocation, (farmLocation) => farmLocation.user)
  farmLocations: FarmLocation[];

  @OneToMany(() => Planting, (planting) => planting.user)
  planting: Planting[];
}
