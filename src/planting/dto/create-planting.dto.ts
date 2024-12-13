import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreatePlantingDto {
  // The variety of the crop being planted 
  @IsString()
  cropVariety: string;

  // The sowing date of the crop (in ISO string format)
  @IsDateString()
  sowingDate: string;

  // The expected harvest date of the crop ( in ISO string format)
  @IsDateString()
  @IsOptional()
  expectedHarvestDate?: string;

  // The transplanting date of the crop ( in ISO string format)
  @IsDateString()
  @IsOptional()
  transplantingDate?: string;

  // The size of the land where the crop is planted (in square units)
  @IsNumber()
  landAreaSize: number;

  // The ID of the land where the crop is planted
  @IsString()
  landId: string;

  // The ID of the farm where the crop is planted
  @IsString()
  farmId: string;

  // The ID of the user associated with the farm
  @IsString()
  farmUserId: string;

  // The spacing between rows in the planting (
  @IsNumber()
  @IsOptional()
  rowSpacing?: number;

  // The spacing between plants in the row 
  @IsNumber()
  @IsOptional()
  plantSpacing?: number;

  // The depth at which the plants are planted 
  @IsNumber()
  @IsOptional()
  plantingDepth?: number;

  // The unit of measurement for planting ( e.g., inches, cm)
  @IsString()
  @IsOptional()
  plantingMeasurementUnit?: string;

  // Whether the planting direction is horizontal 
  @IsBoolean()
  @IsOptional()
  plantingDirectionHorizontal?: boolean;

  // The planting format (e.g., row crop)
  @IsString()
  @IsOptional()
  plantingFormat?: string;

  // The number of plants planted 
  @IsNumber()
  @IsOptional()
  noOfPlants?: number;

  // The number of seeds per hole 
  @IsNumber()
  @IsOptional()
  seedsPerHole?: number;

  // The estimated germination rate of the crop 
  @IsNumber()
  @IsOptional()
  estGerminationRate?: number;

  // The estimated loss rate of the crop 
  @IsNumber()
  @IsOptional()
  estLossRate?: number;

  // The estimated yield per acre 
  @IsNumber()
  @IsOptional()
  estYieldPerAcre?: number;

  // The estimated revenue amount from the crop 
  @IsNumber()
  @IsOptional()
  estRevenueAmount?: number;

  // The unit price for the crop 
  @IsNumber()
  @IsOptional()
  unitPrice?: number;

  // The units in which the harvest will be measured (optional, e.g., KG, tons)
  @IsString()
  @IsOptional()
  harvestUnits?: string;

  // The harvest window for the crop 
  @IsNumber()
  @IsOptional()
  harvestWindow?: number;

  // The average height of the plants 
  @IsNumber()
  @IsOptional()
  averageHeight?: number;

  // The unit of measurement for the bed 
  @IsString()
  @IsOptional()
  bedMeasurementUnit?: string;

  // The origin of the crop 
  @IsString()
  @IsOptional()
  origin?: string;

  // The number of days it takes for the crop to emerge 
  @IsNumber()
  @IsOptional()
  daysToEmerge?: number;

  // The number of days to maturity 
  @IsNumber()
  @IsOptional()
  daysToMaturity?: number;

  // The lot number for the crop 
  @IsString()
  @IsOptional()
  lotNumber?: string;

  // The reference ID of the crop 
  @IsString()
  @IsOptional()
  refCropId?: string;

  // The start method for planting the crop 
  @IsString()
  @IsOptional()
  startMethodId?: string;

  // The seed type ID used for planting 
  @IsString()
  @IsOptional()
  seedTypeId?: string;

  // The seed company ID 
  @IsString()
  @IsOptional()
  seedCompanyId?: string;

  // The quantity of seed used for planting 
  @IsNumber()
  @IsOptional()
  seedQuantity?: number;

  // The unit of measurement for seed quantity (
  @IsString()
  @IsOptional()
  seedQuantityUnit?: string;

  // The ID of the user who created this planting record
  @IsString()
  createdBy: string;

  // The ID of the user who last updated this planting record 
  @IsString()
  @IsOptional()
  updatedBy?: string;

  // The growth stage ID of the crop 
  @IsNumber()
  @IsOptional()
  growthStageId?: number;

  // Whether the task should be automatically created for this planting ( default is true)
  @IsBoolean()
  @IsOptional()
  automaticallyCreateTask?: boolean;
}
