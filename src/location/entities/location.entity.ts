import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Planting } from 'src/planting/entities/planting.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  locationId: number;

  @Column()
  name: string;

  @Column()
  farmId: number;

  @Column('float')
  area: number;

  @Column()
  areaUnitId: number;

  @Column()
  provinceId: number;

  @Column()
  divisionId: number;

  @Column()
  tehsilId: number;

  @Column()
  leaseRate: number;

  @Column()
  shareTenancyPercentage: number;

  @Column('json', { nullable: true })
  coordinates?: { lat: number; lng: number };

  @Column('json', { nullable: true })
  markLocation?: { lat: number; lng: number };

  @Column()
  postalAddress: string;

  @Column()
  soilTypeId: number;

  @Column()
  ownershipId: number;

  @Column()
  estimatedCost: number;

  @Column('json', { nullable: true })
  irrigationMethodId?: number;

  @Column()
  areaUnit: number;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @Column({ nullable: true })
  plantingId: number|null;

  @OneToMany(() => Planting, (planting) => planting.Location)
  plantings: Planting[];
  
}
