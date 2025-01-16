import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class Coordinates {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  farmId: number;

  @IsNumber()
  area: number;

  @IsNumber()
  areaUnitId: number;

  @IsNumber()
  provinceId: number;

  @IsNumber()
  divisionId: number;

  @IsNumber()
  tehsilId: number;

  @IsNumber()
  leaseRate: number;

  @IsNumber()
  shareTenancyPercentage: number;

  @ValidateNested()
  @Type(() => Coordinates)
  coordinates?: Coordinates;

  @ValidateNested()
  @Type(() => Coordinates)
  markLocation?: Coordinates;

  @IsString()
  postalAddress: string;

  @IsNumber()
  soilTypeId: number;

  @IsNumber()
  ownershipId: number;

  @IsNumber()
  estimatedCost: number;

  @IsArray()
  @IsOptional()
  irrigationMethodId?: number[];

  @IsNumber()
  areaUnit: number;

  @IsString()
  createdBy: string;

  @IsString()
  updatedBy: string;

  @IsNumber()
  plantingId: number;
}
