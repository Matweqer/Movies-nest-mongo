import { IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateRatingDto {
  @IsMongoId()
  movieId: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @Max(10)
  rating: number;
}
