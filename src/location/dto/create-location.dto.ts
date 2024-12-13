import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLocationDto{
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

    @IsNumber()
    @IsOptional()
    coordinates?: { lat: number; lng: number };

    @IsNumber()
    @IsOptional()
    markLocation?: { lat: number; lng: number };

    @IsString()
    postalAddress: string;

    @IsNumber()
    soilTypeId: number;

    @IsNumber()
    ownershipId: number;

    @IsNumber()
    estimatedCost: number;

    @IsNumber()
    irrigationMethodId: number;

    @IsNumber()
    areaUnit: number;

    @IsString()
    createdBy: string

    @IsString()
    updatedBy: string;

    @IsNumber()
    plantingId: number;
}