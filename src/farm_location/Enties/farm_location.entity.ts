import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class FarmLocation {
  // Generating the primary key
  @PrimaryGeneratedColumn('uuid')
  farmLocationId: number;

  // Defining name column with the type string
  @Column()
  name: string;

  // Defining type column with the type string
  @Column()
  type: string;

  // Defining area column with the type number which is in float
  @Column('float')
  area: number;

  // Defining soiltype column with the type string
  @Column()
  soilType: string;

  // Defining boundaries column with the type string
  @Column()
  boundaries: string;

  // Defining action column with the type string &stores it in the json format
  @Column('json', { nullable: true })
  action: string;

  // Defining userId column with the type number.
  // As userId is foreign key
  @Column()
  userId: number;

  // Using Relations to join farmLocations with the user
  @ManyToOne(() => User, (user) => user.farmLocations)
  @JoinColumn({ name: 'userId' })
  user: User;
}
