import { Injectable } from '@nestjs/common';
import { CreateUserNotificationDeviceDto } from './dto/create-user_notification_device.dto';
import { UpdateUserNotificationDeviceDto } from './dto/update-user_notification_device.dto';

@Injectable()
export class UserNotificationDeviceService {
  create(createUserNotificationDeviceDto: CreateUserNotificationDeviceDto) {
    return 'This action adds a new userNotificationDevice';
  }

  findAll() {
    return `This action returns all userNotificationDevice`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userNotificationDevice`;
  }

  update(
    id: number,
    updateUserNotificationDeviceDto: UpdateUserNotificationDeviceDto,
  ) {
    return `This action updates a #${id} userNotificationDevice`;
  }

  remove(id: string) {
    return `This action removes a #${id} userNotificationDevice`;
  }
}
