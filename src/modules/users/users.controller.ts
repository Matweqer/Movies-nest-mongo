import { Controller, Get, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ParamsDto } from '../../common/dto/params.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param(ValidationPipe) params: ParamsDto) {
    return this.usersService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param(ValidationPipe) params: ParamsDto) {
    return this.usersService.remove(params.id);
  }
}
