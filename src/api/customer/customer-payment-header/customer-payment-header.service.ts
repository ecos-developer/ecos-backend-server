import { Injectable } from '@nestjs/common';
import { CreateCustomerPaymentHeaderDto } from './dto/create-customer-payment-header.dto';
import { UpdateCustomerPaymentHeaderDto } from './dto/update-customer-payment-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import { EnvService } from 'src/api/env/env.service';

@Injectable()
export class CustomerPaymentHeaderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly env: EnvService,
  ) {}

  async create(
    payment_proof_image_file: Express.Multer.File,
    createCustomerPaymentHeaderDto: CreateCustomerPaymentHeaderDto,
  ) {
    const image_name = await this.imageUpload(payment_proof_image_file);
    createCustomerPaymentHeaderDto.payment_proof_image = image_name;
  }

  async imageUpload(file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('profile_image_file', Buffer.from(file.buffer), {
      filename: file.originalname,
    });

    const imageUpload = await axios.post(
      `${this.env.getConfigValues().IMAGE_SERVER_ENDPOINT}/upload-image/user-detail`,
      formData,
      {
        headers: formData.getHeaders(),
      },
    );
    return imageUpload.data;
  }

  async findAll() {
    const allCustomerPayment = await this.prisma.paymentHeader.findMany({
      include: {
        customer_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
          },
        },
        calculate_payment: true,
      },
    });
    return allCustomerPayment;
  }

  async findOne(id: string) {
    const findCustomerPayment = await this.prisma.paymentHeader.findFirst({
      where: {
        customer_payment_id: id,
      },
      include: {
        customer_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
                customer_detail: true,
              },
            },
          },
        },
        calculate_payment: true,
      },
    });
    return findCustomerPayment;
  }

  update(
    id: number,
    updateCustomerPaymentHeaderDto: UpdateCustomerPaymentHeaderDto,
  ) {
    return `This action updates a #${id} customerPaymentHeader`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerPaymentHeader`;
  }
}
