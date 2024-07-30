import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
} from '@nestjs/common';
import { CustomerPaymentHeaderService } from './customer-payment-header.service';
import { CreateCustomerPaymentHeaderDto } from './dto/create-customer-payment-header.dto';
import { UpdateCustomerPaymentHeaderDto } from './dto/update-customer-payment-header.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('CustomerPaymentHeader Table (token required)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('customer-payment-header')
export class CustomerPaymentHeaderController {
  constructor(
    private readonly customerPaymentHeaderService: CustomerPaymentHeaderService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Insert new customer payment' })
  @ApiBody({
    description: 'Endpoint for create new PaymentHeader',
    type: CreateCustomerPaymentHeaderDto,
  })
  async create(
    @Body() createCustomerPaymentHeaderDto: CreateCustomerPaymentHeaderDto,
  ) {
    const newPaymentHeader = await this.customerPaymentHeaderService.create(
      createCustomerPaymentHeaderDto,
    );
    return new HttpException(newPaymentHeader, HttpStatus.CREATED);
  }

  @Get()
  async findAll() {
    const allCustomerPayment =
      await this.customerPaymentHeaderService.findAll();
    return new HttpException(allCustomerPayment, HttpStatus.CREATED);
  }

  @Get(':customer_payment_id')
  @ApiParam({
    name: 'customer_payment_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'get this ID from PaymentHeader table',
  })
  async findOne(@Param('customer_payment_id') id: string) {
    const findCustomerPayment =
      await this.customerPaymentHeaderService.findOne(id);

    if (!findCustomerPayment) {
      throw new MethodNotAllowedException(
        `PaymentHeader with ID ${id} is not found!`,
      );
    }
    return new HttpException(findCustomerPayment, HttpStatus.CREATED);
  }

  @Get('user/:user_id')
  @ApiParam({
    name: 'user_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'get this ID from PaymentHeader table',
  })
  async findByUserId(@Param('user_id') id: string) {
    const findCustomerPayment =
      await this.customerPaymentHeaderService.findByUserId(id);

    if (!findCustomerPayment) {
      throw new MethodNotAllowedException(
        `PaymentHeader with ID ${id} is not found!`,
      );
    }
    return new HttpException(findCustomerPayment, HttpStatus.CREATED);
  }

  @Patch(':customer_payment_id')
  @ApiParam({
    name: 'customer_payment_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'get this ID from PaymentHeader table',
  })
  @ApiBody({
    description: 'Endpoint for update PaymentHeader',
    type: UpdateCustomerPaymentHeaderDto,
  })
  async update(
    @Param('customer_payment_id') id: string,
    @Body() updateCustomerPaymentHeaderDto: UpdateCustomerPaymentHeaderDto,
  ) {
    const updatePaymentHeader = await this.customerPaymentHeaderService.update(
      id,
      updateCustomerPaymentHeaderDto,
    );
    return new HttpException(updatePaymentHeader, HttpStatus.CREATED);
  }
}
