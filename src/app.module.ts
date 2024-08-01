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
import { RoomChatModule } from './api/chat/room-chat/room-chat.module';
import { ChatMessageModule } from './api/chat/chat-message/chat-message.module';
import { RealtimeLocationModule } from './api/realtime/realtime-location/realtime-location.module';
import { RealtimeCustomerEachDayPickupModule } from './api/realtime/realtime-customer-each-day-pickup/realtime-customer-each-day-pickup.module';
import { NotificationModule } from './api/notification/notification.module';

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
    RoomChatModule,
    ChatMessageModule,
    RealtimeLocationModule,
    RealtimeCustomerEachDayPickupModule,

    // NOTIFICATION
    NotificationModule,
  ],
})
export class AppModule {}
