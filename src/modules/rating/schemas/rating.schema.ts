import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Rating {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Movie' })
  movie: MongooseSchema.Types.ObjectId;

  @Prop()
  rating: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
