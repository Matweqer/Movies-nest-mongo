import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { Movie } from './schemas/movie.schema';
import * as fs from 'fs';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieModel.create({ ...createMovieDto, image: null });
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

    if (movie.image) {
      const extension = movie.image.slice(movie.image.indexOf('.'));
      fs.unlink(`public/images/${id}${extension}`, (err) =>
        console.error(err ? err : 'Image deleted'),
      );
    }
    return movie;
  }

  async afterUploadImage(
    id: string,
    file: Express.Multer.File,
  ): Promise<Movie> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      fs.unlink(`public/images/${file.filename}`, (err) =>
        console.error(err ? err : 'Image deleted'),
      );
      throw new HttpException('No movie in database', HttpStatus.NOT_FOUND);
    }

    movie.image = `static/images/${file.filename}`;
    await movie.save();
    return movie;
  }
}
