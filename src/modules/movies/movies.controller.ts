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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ParamsDto } from '../../common/dto/params.dto';
import { AuthGuard } from '../auth/auth.guard';
import { diskStorage } from 'multer';
import { Request } from 'express';

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

  @UseGuards(AuthGuard)
  @Post(':id/upload-img')
  @UseInterceptors(
    new (FileInterceptor('img', {
      storage: diskStorage({
        filename(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const extension = file.originalname.slice(
            file.originalname.indexOf('.'),
          );
          const movieID = req.params.id;
          callback(null, `${movieID}${extension}`);
        },
        destination: 'public/images',
      }),
    }))(),
  )
  uploadMoviePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Param(ValidationPipe) params: ParamsDto,
  ) {
    return this.moviesService.afterUploadImage(params.id, file);
  }
}
