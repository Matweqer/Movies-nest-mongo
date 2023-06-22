import { IsMongoId } from 'class-validator';

export class ParamsDto {
  @IsMongoId()
  public id: string;
}
