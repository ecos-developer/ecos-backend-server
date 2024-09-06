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
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
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

  @Get(':email')
  @ApiOperation({ summary: 'get specific user by email' })
  @ApiParam({
    name: 'email',
    description: 'email of user',
    type: 'string',
    example: '2c1390a4-0b50-48fb-8145-bd8a90558fc7',
  })
  async findByEmail(@Param('email') email: string) {
    const findUser = await this.authService.findByEmail(email);
    if (!findUser) {
      throw new MethodNotAllowedException(`${email} is not registered user!`);
    }
    return new HttpException(findUser, HttpStatus.OK);
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'delete specific user by user_id' })
  @ApiParam({
    name: 'user_id',
    description: 'user_id of user',
    type: 'string',
    example: 'get this from users table',
  })
  async deleteById(@Param('user_id') user_id: string) {
    const findUser = await this.authService.findById(user_id);
    if (!findUser) {
      throw new MethodNotAllowedException(`${user_id} is not registered user!`);
    }
    const deleteUser = await this.authService.deleteUserById(user_id);
    return new HttpException(deleteUser, HttpStatus.OK);
  }
}
