import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmLocationDto } from './create-farm-location.dto';

export class UpdateFarmLocationDto extends PartialType(CreateFarmLocationDto) {}
