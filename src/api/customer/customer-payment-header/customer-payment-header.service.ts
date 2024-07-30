import { Injectable } from '@nestjs/common';
import { CreateCustomerPaymentHeaderDto } from './dto/create-customer-payment-header.dto';
import { UpdateCustomerPaymentHeaderDto } from './dto/update-customer-payment-header.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerPaymentHeaderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerPaymentHeaderDto: CreateCustomerPaymentHeaderDto) {
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

  async findByUserId(user_id: string) {
    const findCustomerPayment = await this.prisma.user.findFirst({
      where: {
        user_id,
      },
      include: {
        user_detail: true,
        customer_order_header: {
          include: {
            payment_header: true,
          },
        },
      },
    });
    return findCustomerPayment;
  }

  async update(
    customer_payment_id: string,
    updateCustomerPaymentHeaderDto: UpdateCustomerPaymentHeaderDto,
  ) {
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
