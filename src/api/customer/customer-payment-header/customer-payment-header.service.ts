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

    const expired_at = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
    const newPaymentHeader = await this.prisma.paymentHeader.create({
      data: {
        ...createCustomerPaymentHeaderDto,
        is_admin_approved: false,
        expired_at,
      },
    });
    return newPaymentHeader;
  }

  async imageUpload(file: Express.Multer.File) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('payment_proof_image', Buffer.from(file.buffer), {
      filename: file.originalname,
    });

    const imageUpload = await axios.post(
      `${this.env.getConfigValues().IMAGE_SERVER_ENDPOINT}/upload-image/payment-header`,
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
      },
    });
    return findCustomerPayment;
  }

  async update(
    customer_payment_id: string,
    payment_proof_image_file: Express.Multer.File,
    updateCustomerPaymentHeaderDto: UpdateCustomerPaymentHeaderDto,
  ) {
    const image_name = await this.imageUpload(payment_proof_image_file);
    updateCustomerPaymentHeaderDto.payment_proof_image = image_name;

    const updatePaymentHeader = await this.prisma.paymentHeader.update({
      where: {
        customer_payment_id,
      },
      data: {
        ...updateCustomerPaymentHeaderDto,
      },
    });
    return updatePaymentHeader;
  }
}
