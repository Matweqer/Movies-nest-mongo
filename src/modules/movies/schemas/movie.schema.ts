import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
