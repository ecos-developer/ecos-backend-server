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
  MethodNotAllowedException,
  Delete,
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
import { DriverOrderHeaderService } from 'src/api/admin/driver-order-header/driver-order-header.service';

@ApiTags('CustomerOrderHeader Table (token required)')
@Controller('customer-order-header')
@ApiBearerAuth('access-token')
export class CustomerOrderHeaderController {
  constructor(
    private readonly customerOrderHeaderService: CustomerOrderHeaderService,
    private readonly driverOrderHeaderService: DriverOrderHeaderService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Insert customer order header',
    description: `
    - This endpoint inserts a new customer order header
    - Include validation the corresponding DriverOrderHeader is approved by an admin before creating the customer order
    - Include validation non duplicate pairs between order_id and user_id
    `,
  })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCustomerOrderHeaderDto: CreateCustomerOrderHeaderDto,
  ) {
    const driverOrderHeader = await this.driverOrderHeaderService.findOne(
      createCustomerOrderHeaderDto.order_id,
    );
    if (!driverOrderHeader.is_admin_approved) {
      throw new MethodNotAllowedException(
        `DriverOrderHeader must be approved by admin first! status order: ${driverOrderHeader.is_admin_approved}`,
      );
    }

    const findDuplicateCustomerOrderHeader =
      await this.customerOrderHeaderService.findByPairs(
        createCustomerOrderHeaderDto.user_id,
        driverOrderHeader.order_id,
      );
    if (findDuplicateCustomerOrderHeader) {
      throw new MethodNotAllowedException(
        `customer ${createCustomerOrderHeaderDto.user_id} is already book this driver! Duplicate pairs order_id and user_id detected!`,
      );
    }
    const newCustomerORder = await this.customerOrderHeaderService.create(
      createCustomerOrderHeaderDto,
    );
    return new HttpException(newCustomerORder, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'find all customer order header' })
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const allCustomerOrderHeader =
      await this.customerOrderHeaderService.findAll();
    return new HttpException(allCustomerOrderHeader, HttpStatus.CREATED);
  }

  @Get(':customer_order_id')
  @ApiOperation({ summary: 'find customer order by customer_order_id' })
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

  @Get('user/:user_id')
  @ApiOperation({ summary: 'find customer order by user_id' })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'user_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'aa1f9715-b276-4154-95bf-6466afa6886c',
  })
  async findByUserId(@Param('user_id') id: string) {
    const findCustomerOrderHeader =
      await this.customerOrderHeaderService.findByUserId(id);
    return new HttpException(findCustomerOrderHeader, HttpStatus.CREATED);
  }

  @Patch(':customer_order_id')
  @ApiOperation({ summary: 'update customer order by id' })
  @UseGuards(JwtAuthGuard)
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

  @Delete(':customer_order_id')
  @ApiOperation({ summary: 'delete CustomerOrderHeader by customer_order_id' })
  @ApiParam({
    name: 'customer_order_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'get this from CustomerOrderHeader table',
  })
  async deleteById(@Param('customer_order_id') id: string) {
    const findCustomerOrderHeader =
      await this.customerOrderHeaderService.delete(id);
    return new HttpException(findCustomerOrderHeader, HttpStatus.CREATED);
  }
}
