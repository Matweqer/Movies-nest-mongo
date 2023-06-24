import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { CurrentUserId } from '../users/user.decorator';
import { AuthGuard } from '../auth/auth.guard';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createRatingDto: CreateRatingDto,
    @CurrentUserId() userId: string,
  ) {
    return this.ratingService.create(userId, createRatingDto);
  }
}
