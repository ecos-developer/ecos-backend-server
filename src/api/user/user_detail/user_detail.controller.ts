import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailDto } from './dto/user_detail.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('UserDetail Table (token required, all role authorized)')
@ApiBearerAuth('access-token')
@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get user detail by token' })
  async findOne(@Req() req: Request) {
    const userDetail = await this.userDetailService.findOne(req.user as User);
    return new HttpException(userDetail, HttpStatus.CREATED);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'update user detail by token (optional field)' })
  @ApiBody({
    description: 'endpoint for customer, driver, and admin detail information',
    type: UserDetailDto,
  })
  async update(@Req() req: Request, @Body() userDetailDto: UserDetailDto) {
    try {
      const updateUser = await this.userDetailService.update(
        req.user as User,
        userDetailDto,
      );
      return new HttpException(updateUser, HttpStatus.CREATED);
    } catch (error) {
      throw new MethodNotAllowedException(error.message);
    }
  }
}
