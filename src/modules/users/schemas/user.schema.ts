import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Rating } from '../../rating/schemas/rating.schema';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Rating' }] })
  ratings: Rating[];
}

export const UserSchema = SchemaFactory.createForClass(User);
