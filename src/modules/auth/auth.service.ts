import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthHelper } from './auth.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registration(registerUserDto: RegisterUserDto) {
    const hashedPassword: string = await AuthHelper.hashPassword(
      registerUserDto.password,
    );
    return await this.userModel.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({ email: loginUserDto.email })
      .exec();
    if (!user)
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    const isPassRight = await AuthHelper.comparePasswords(
      loginUserDto.password,
      user.password,
    );

    if (!isPassRight)
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.BAD_REQUEST,
      );

    const payload = { user: user.id };
    return {
      access: await this.jwtService.signAsync(payload),
    };
  }
}
