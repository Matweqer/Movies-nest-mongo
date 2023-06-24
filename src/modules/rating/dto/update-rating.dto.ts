import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateRatingDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  rating: number;
}
