import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Rating } from '../../rating/schemas/rating.schema';

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Rating' }] })
  ratings: Rating[];

  @Prop()
  totalRating: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
