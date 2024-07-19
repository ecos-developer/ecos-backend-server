import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('Payment Table (token required, driver authorized)')
@ApiBearerAuth('access-token')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get driver payment information by token' })
  async findOne(@Req() req: Request) {
    return this.paymentService.findOne(req.user as User);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create driver payment information by token' })
  async create(
    @Req() req: Request,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.create(req.user as User, createPaymentDto);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create driver payment information by token' })
  async update(
    @Req() req: Request,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.update(req.user as User, updatePaymentDto);
  }
}
