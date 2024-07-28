import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Put,
  MethodNotAllowedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Request } from 'express';
import { LocalGuard } from '../auth/guards/local.guard';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'login for all users' })
  @ApiBody({
    description: 'endpoint for customer, driver, and admin login',
    type: LoginAuthDto,
  })
  async login(@Req() req: Request) {
    return req.user;
  }

  @Put()
  @ApiOperation({ summary: "update user's password" })
  async updatePass(@Body() updateAuthDto: UpdateAuthDto) {
    const findUser = await this.authService.findById(updateAuthDto.user_id);
    if (!findUser) {
      throw new MethodNotAllowedException(
        `user with id ${updateAuthDto.user_id} is not found!`,
      );
    }
    const updatePass = await this.authService.updatePass(updateAuthDto);
    return new HttpException(updatePass, HttpStatus.OK);
  }

  @Patch()
  @ApiOperation({ summary: 'register for customer, driver, and admin' })
  @ApiBody({
    description: 'endpoint for register new customer, driver, and admin',
    type: RegisterAuthDto,
  })
  customer(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
