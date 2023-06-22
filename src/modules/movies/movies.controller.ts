import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ParamsDto } from '../../common/dto/params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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

  @Put(':id')
  update(
    @Param(ValidationPipe) params: ParamsDto,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(params.id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param(ValidationPipe) params: ParamsDto) {
    return this.moviesService.remove(params.id);
  }
}
