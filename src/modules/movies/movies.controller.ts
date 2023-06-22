import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ParamsDto } from '../../common/dto/params.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param(ValidationPipe) params: ParamsDto) {
    return this.moviesService.findOne(params.id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param(ValidationPipe) params: ParamsDto,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(params.id, updateMovieDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param(ValidationPipe) params: ParamsDto) {
    return this.moviesService.remove(params.id);
  }
}
