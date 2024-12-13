import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFarmLocationDto {
  // Defining the name with the type string
  @IsString()
  @IsNotEmpty()
  name: string;

  // Defining area with the type number
  @IsNumber()
  @IsNotEmpty()
  area: number;

  // Defining type with the type string
  @IsString()
  @IsNotEmpty()
  type: string;

  // Defining soilType with the type string
  @IsString()
  @IsNotEmpty()
  soilType: string;

  // Defining boundaries with the type string
  // Defining optional here that it can be null
  @IsString()
  @IsOptional()
  boundaries?: string;

  // Defining action as a string
  @IsString()
  @IsOptional()
  action?: string;

  // Defining userId as a number
  @IsNumber()
  userId: number;
}
