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
  UseInterceptors,
  UploadedFile,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { CustomerPaymentHeaderService } from './customer-payment-header.service';
import { CreateCustomerPaymentHeaderDto } from './dto/create-customer-payment-header.dto';
import { UpdateCustomerPaymentHeaderDto } from './dto/update-customer-payment-header.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomerPaymentHeaderPipe } from './pipe/customer-payment-header.pipe';

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Endpoint for customer, driver, and admin detail information',
    type: CreateCustomerPaymentHeaderDto,
  })
  @UsePipes(new CustomerPaymentHeaderPipe())
  @UseInterceptors(FileInterceptor('payment_proof_image_file'))
  async create(
    @Body() createCustomerPaymentHeaderDto: CreateCustomerPaymentHeaderDto,
    @UploadedFile() payment_proof_image_file: Express.Multer.File,
  ) {
    if (payment_proof_image_file.size === undefined) {
      throw new BadRequestException('Uploaded file is empty.');
    }

    const newPaymentHeader = await this.customerPaymentHeaderService.create(
      payment_proof_image_file,
      createCustomerPaymentHeaderDto,
    );
    return new HttpException(newPaymentHeader, HttpStatus.CREATED);
  }

  @Get()
  async findAll() {
    const allCustomerPayment = await this.customerPaymentHeaderService.findAll();
    return new HttpException(allCustomerPayment, HttpStatus.CREATED);
  }

  @Get(':customer_payment_id')
  @ApiParam({
    name: 'customer_payment_id',
    description: 'customer_order_id for the customer order',
    type: String,
    example: 'aa1f9715-b276-4154-95bf-6466afa6886c',
  })
  async findOne(@Param('customer_payment_id') id: string) {
    const findCustomerPayment =
      await this.customerPaymentHeaderService.findOne(id);
    return new HttpException(findCustomerPayment, HttpStatus.CREATED);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerPaymentHeaderDto: UpdateCustomerPaymentHeaderDto,
  ) {
    return this.customerPaymentHeaderService.update(
      +id,
      updateCustomerPaymentHeaderDto,
    );
  }
}
