import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { Movie } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieModel.create(createMovieDto);
  }

  async findAll(): Promise<Movie[]> {
    return await this.movieModel.find().exec();
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id);
    if (!movie)
      throw new HttpException('No movie in database', HttpStatus.NOT_FOUND);

    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, {
        new: true,
      })
      .exec();

    if (!movie)
      throw new HttpException('No movie in database', HttpStatus.NOT_FOUND);

    return movie;
  }

  async remove(id: string): Promise<Movie> {
    const movie = await this.movieModel.findByIdAndRemove(id).exec();
    if (!movie)
      throw new HttpException('No movie in database', HttpStatus.NOT_FOUND);

    return movie;
  }
}
