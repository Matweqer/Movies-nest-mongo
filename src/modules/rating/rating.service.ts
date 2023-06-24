import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './schemas/rating.schema';
import { User } from '../users/schemas/user.schema';
import { Movie } from '../movies/schemas/movie.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Movie.name) private readonly movieModel: Model<Movie>,
  ) {}

  private countTotalRating(movie: Movie): number {
    const ratingSum: number = movie.ratings.reduce(
      (sum, currentValue) => sum + currentValue.rating,
      0,
    );
    const countOfRatings = movie.ratings.length;

    const totalRating = ratingSum / countOfRatings;

    return Number(totalRating.toFixed(2));
  }

  async create(userId: string, createRatingDto: CreateRatingDto) {
    const [user, movie] = await Promise.all([
      this.userModel.findById(userId).exec(),
      this.movieModel
        .findById(createRatingDto.movieId)
        .populate('ratings')
        .exec(),
    ]);

    const rating = new this.ratingModel({
      ...createRatingDto,
      userId,
    });

    user.ratings.push(rating);
    movie.ratings.push(rating);

    movie.totalRating = this.countTotalRating(movie as Movie);

    await Promise.all([user.save(), movie.save(), rating.save()]);

    return rating;
  }
}
