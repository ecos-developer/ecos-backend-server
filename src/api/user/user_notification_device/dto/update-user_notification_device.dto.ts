import { PartialType } from '@nestjs/swagger';
import { CreateUserNotificationDeviceDto } from './create-user_notification_device.dto';

export class UpdateUserNotificationDeviceDto extends PartialType(CreateUserNotificationDeviceDto) {}
