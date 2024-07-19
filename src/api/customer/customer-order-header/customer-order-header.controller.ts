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
  NotFoundException,
} from '@nestjs/common';
import { CustomerOrderHeaderService } from './customer-order-header.service';
import { CreateCustomerOrderHeaderDto } from './dto/create-customer-order-header.dto';
import { UpdateCustomerOrderHeaderDto } from './dto/update-customer-order-header.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('CustomerOrderHeader Table (token required)')
@ApiBearerAuth('access-token')
@Controller('customer-order-header')
@UseGuards(JwtAuthGuard)
export class CustomerOrderHeaderController {
  constructor(
    private readonly customerOrderHeaderService: CustomerOrderHeaderService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'insert customer order header' })
  async create(
    @Body() createCustomerOrderHeaderDto: CreateCustomerOrderHeaderDto,
  ) {
    const newCustomerORder = await this.customerOrderHeaderService.create(
      createCustomerOrderHeaderDto,
    );
    return new HttpException(newCustomerORder, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'find all customer order header' })
  async findAll() {
    const allCustomerOrderHeader =
      await this.customerOrderHeaderService.findAll();
    return new HttpException(allCustomerOrderHeader, HttpStatus.CREATED);
  }

  @Get(':customer_order_id')
  @ApiOperation({ summary: 'find customer order by id' })
  @ApiParam({
    name: 'customer_order_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'aa1f9715-b276-4154-95bf-6466afa6886c',
  })
  async findOne(@Param('customer_order_id') id: string) {
    const findCustomerOrderHeader =
      await this.customerOrderHeaderService.findOne(id);
    return new HttpException(findCustomerOrderHeader, HttpStatus.CREATED);
  }

  @Patch(':customer_order_id')
  @ApiOperation({ summary: 'update customer order by id' })
  @ApiParam({
    name: 'customer_order_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'aa1f9715-b276-4154-95bf-6466afa6886c',
  })
  async update(
    @Param('customer_order_id') id: string,
    @Body() updateCustomerOrderHeaderDto: UpdateCustomerOrderHeaderDto,
  ) {
    const findCustomerOrderHeader =
      await this.customerOrderHeaderService.findOne(id);
    if (!findCustomerOrderHeader) {
      throw new NotFoundException(
        `customer order header with id ${id} is not found!`,
      );
    }
    const updateCustomerOrderHeader =
      await this.customerOrderHeaderService.update(
        id,
        updateCustomerOrderHeaderDto,
      );
    return new HttpException(updateCustomerOrderHeader, HttpStatus.CREATED);
  }
}
