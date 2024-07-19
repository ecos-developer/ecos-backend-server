import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { join } from 'path';
import { DriverVehicleDetailModule } from './api/driver/driver_vehicle_detail/driver_vehicle_detail.module';
import { UserDetailModule } from './api/user/user_detail/user_detail.module';
import { AdminApprovalModule } from './api/admin/admin-approval/admin-approval.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PaymentModule } from './api/driver/payment/payment.module';
import { DetailModule } from './api/customer/detail/detail.module';
import { AdminTimeBlockModule } from './api/admin/admin-time-block/admin-time-block.module';
import { DriverOrderHeaderModule } from './api/admin/driver-order-header/driver-order-header.module';
import { CustomerOrderHeaderModule } from './api/customer/customer-order-header/customer-order-header.module';
import { CustomerPaymentHeaderModule } from './api/customer/customer-payment-header/customer-payment-header.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    AuthModule,

    // ALL USER
    UserDetailModule,

    // DRIVER
    DriverVehicleDetailModule,
    PaymentModule,

    // CUSTOMER
    DetailModule,
    CustomerOrderHeaderModule,
    CustomerPaymentHeaderModule,

    // ADMIN
    AdminApprovalModule,
    AdminTimeBlockModule,
    DriverOrderHeaderModule,
  ],
})
export class AppModule {}
