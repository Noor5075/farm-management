import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class FarmLocation {
  // Generating the primary key
  @PrimaryGeneratedColumn('uuid')
  farmLocationId: String;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // Unique identifier for the user who created the planting record.
  // This field is mandatory.
  @Column({ default: 'system' })
  createdBy: string;

  // Updated timestamp when the record is modified
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  // Identifier for the user who last updated the record
  @Column({ nullable: true })
  updatedBy: string;

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
  action: any;

  // Defining userId column with the type number.
  // As userId is foreign key
  @Column('uuid')
  userId: string;

  // Using Relations to join farmLocations with the user
  @ManyToOne(() => User, (user) => user.farmLocations)
  @JoinColumn({ name: 'userId' })
  user: User;
}
