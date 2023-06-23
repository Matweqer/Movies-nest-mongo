import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
