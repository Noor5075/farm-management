import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Planting {
  // Defining unidueId of planting by uuid
  @PrimaryGeneratedColumn('uuid')
  plantingId: string;

  @Column({ nullable: false })
  cropVariety: string;

  // Using timestamp type to define date and time both in sowingDate
  //  Nullable is set to false because it can't let null in the database
  @Column({ type: 'timestamp', nullable: false })
  sowingDate: Date;

  //  Using timestamp type to define date and time both in expectedHarvestDate
  //  Nullable is set to true because it can be optional and can be left empty in the database
  @Column({ type: 'timestamp', nullable: true })
  expectedHarvestDate: Date;

  //  Using timestamp type to define date and time both in transplantingDate
  // Nullable is set to true because it can be optional and can be left empty in the database
  @Column({ type: 'timestamp', nullable: true })
  transplantingDate: Date;

  // Specifies the size of the land area allocated for planting, measured in acres or another unit.
  // This field is mandatory as it is crucial for planning and resource allocation.
  @Column({ type: 'float', nullable: false })
  landAreaSize: number;

  // Unique identifier for the land associated with the planting process.
  // This field is mandatory.
  @Column({ nullable: false })
  landId: string;

  // Unique identifier for the farm where the planting takes place.
  // This field is mandatory.
  @Column({ nullable: false })
  farmId: string;

  // Unique identifier for the user managing the farm and planting process.
  // This field is mandatory.
  @Column({ nullable: false })
  farmUserId: string;

  // Specifies the spacing between rows of plants, measured in the selected unit.
  // This field is optional.
  @Column({ type: 'float', nullable: true })
  rowSpacing: number;

  // Specifies the spacing between individual plants, measured in the selected unit.
  // This field is optional.
  @Column({ nullable: true })
  plantSpacing: number;

  // Specifies the depth at which seeds or plants are placed into the soil, measured in the selected unit.
  // This field is optional.
  @Column({ nullable: true })
  plantingDepth: number;

  // The measurement unit used for planting-related dimensions, such as spacing and depth.
  // This field is optional.
  @Column({ nullable: true })
  plantingMeasurementUnit: string;

  // Indicates whether the planting is oriented horizontally. Defaults to false.
  // This field is optional.
  @Column({ type: 'boolean', default: false })
  plantingDirectionHorizontal: boolean;

  // Specifies the format of planting, such as "Row Crop" or "Broadcast".
  // This field is optional.
  @Column({ nullable: true })
  plantingFormat: string;

  // The total number of plants involved in the planting process.
  // This field is optional.
  @Column({ nullable: true })
  noOfPlants: number;

  // The number of seeds placed in each planting hole.
  // This field is optional.
  @Column({ nullable: true })
  seedsPerHole: number;

  // Estimated germination rate for the seeds, expressed as a percentage.
  // This field is optional.
  @Column({ type: 'float', nullable: true })
  estGerminationRate: number;

  // Estimated percentage of loss during the planting or growth process.
  // This field is optional.
  @Column({ nullable: true })
  estLossRate: number;

  // Estimated yield per acre, calculated based on the planting plan and conditions.
  // This field is optional.
  @Column({ nullable: true })
  estYieldPerAcre: number;

  // Estimated revenue amount expected from the planting process.
  // This field is optional.
  @Column({ type: 'float', nullable: true })
  estRevenueAmount: number;

  // Price per unit of the crop being planted.
  // This field is optional.
  @Column({ type: 'float', nullable: true })
  unitPrice: number;

  // The measurement units for the harvested crop, such as "KG" or "Ton".
  // This field is optional.
  @Column({ nullable: true })
  harvestUnits: string;

  // Specifies the number of days the harvest can be spread across.
  // This field is optional.
  @Column({ nullable: true })
  harvestWindow: number;

  // Average height of the plants, measured in the selected unit.
  // This field is optional.
  @Column({ type: 'float', nullable: true })
  averageHeight: number;

  // The measurement unit used for bed dimensions, such as "centimeter" or "inch".
  // This field is optional.
  @Column({ nullable: true })
  bedMeasurementUnit: string;

  // The origin or source location of the seeds or plants being used.
  // This field is optional.
  @Column({ nullable: true })
  origin: string;

  // Number of days it takes for the seeds to germinate after sowing.
  // This field is optional.
  @Column({ nullable: true })
  daysToEmerge: number;

  // Number of days it takes for the crop to reach maturity after sowing.
  // This field is optional.
  @Column({ nullable: true })
  daysToMaturity: number;

  // The lot number associated with the seeds or planting batch.
  // This field is optional
  @Column({ nullable: true })
  lotNumber: string;

  // Reference identifier for the crop being planted.
  // This field is optional.
  @Column({ nullable: true })
  refCropId: string;

  // Identifier for the method used to start planting, such as direct sowing or transplanting.
  // This field is optional.
  @Column({ nullable: true })
  startMethodId: string;

  // Identifier for the type of seed used, such as hybrid or organic.
  // This field is optional.
  @Column({ nullable: true })
  seedTypeId: string;

  // Identifier for the seed company that supplied the seeds.
  // This field is optional.
  @Column({ nullable: true })
  seedCompanyId: string;

  // Total quantity of seeds used in the planting process.
  // This field is optional.
  @Column({ nullable: true })
  seedQuantity: number;

  // Unit of measurement for the seed quantity, such as "KG" or "grams".
  // This field is optional.
  @Column({ nullable: true })
  seedQuantityUnit: string;

  // Unique identifier for the user who created the planting record.
  // This field is mandatory.
  @Column({ nullable: false })
  createdBy: string;

  // Unique identifier for the user who last updated the planting record.
  // This field is optional.
  @Column({ nullable: true })
  updatedBy: string;

  // Identifier for the current growth stage of the crop.
  // This field is optional.
  @Column({ nullable: true })
  growthStageId: number;

  // Indicates whether tasks should be automatically created for this planting. Defaults to true.
  // This field is optional.
  @Column({ type: 'boolean', default: true })
  automaticallyCreateTask: boolean;

  @ManyToOne(() => User, (user) => user.planting)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Location, (location) => location.plantings)
  @JoinColumn({ name: 'locationId' })
  Location: Location;
}
