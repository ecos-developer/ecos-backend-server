import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserNotificationDeviceService } from './user_notification_device.service';
import { CreateUserNotificationDeviceDto } from './dto/create-user_notification_device.dto';
import { UpdateUserNotificationDeviceDto } from './dto/update-user_notification_device.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('UserNotificationDevices Table (token required, all role authorized)')
@Controller('user-notification-device')
export class UserNotificationDeviceController {
  constructor(
    private readonly userNotificationDeviceService: UserNotificationDeviceService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create new notification devices based on jwt token',
  })
  async create(
    @Body() createUserNotificationDeviceDto: CreateUserNotificationDeviceDto,
  ) {
    return this.userNotificationDeviceService.create(
      createUserNotificationDeviceDto,
    );
  }

  @Get()
  async findAll() {
    return this.userNotificationDeviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') user_notification_device_id: string) {
    return this.userNotificationDeviceService.findOne(
      user_notification_device_id,
    );
  }

  @Get('user/:user_id')
  async findByUserId(@Param('user_id') user_notification_device_id: string) {
    return this.userNotificationDeviceService.findOne(
      user_notification_device_id,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserNotificationDeviceDto: UpdateUserNotificationDeviceDto,
  ) {
    return this.userNotificationDeviceService.update(
      +id,
      updateUserNotificationDeviceDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') user_notification_device_id: string) {
    return this.userNotificationDeviceService.remove(
      user_notification_device_id,
    );
  }
}
