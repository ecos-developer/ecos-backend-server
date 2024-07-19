import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DetailService } from './detail.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
import { CreateCustomerDetailDto } from './dto/create-customer-detail.dto';
import { UpdateCustomerDetailDto } from './dto/update-customer-detail.dto';

@ApiTags('customer detail (token required, customer authorized)')
@ApiBearerAuth('access-token')
@Controller('customer-detail')
export class DetailController {
  constructor(private readonly detailService: DetailService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get customer detail by token' })
  async findOne(@Req() req: Request) {
    return this.detailService.findOne(req.user as User);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create new customer detail by token' })
  async create(
    @Req() req: Request,
    @Body() createCustomerDetailDto: CreateCustomerDetailDto,
  ) {
    return this.detailService.create(req.user as User, createCustomerDetailDto);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create new customer detail by token' })
  async update(
    @Req() req: Request,
    @Body() updateCustomerDetailDto: UpdateCustomerDetailDto,
  ) {
    return this.detailService.update(req.user as User, updateCustomerDetailDto);
  }
}
