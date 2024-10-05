import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Notification table (token required)')
// @ApiBearerAuth('access-token')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({
    summary: 'get all notification',
  })
  async findAll() {
    const notifications = await this.notificationService.findAll();
    return new HttpException(notifications, HttpStatus.OK);
  }

  @Get(':notification_id')
  @ApiParam({
    name: 'notification_id',
    type: String,
    example: 'get this ID from Notification table',
  })
  @ApiOperation({
    summary: 'get notification by notification_id',
  })
  async findOne(@Param('notification_id') id: string) {
    const findNotif = await this.notificationService.findOne(id);

    if (!findNotif) {
      throw new MethodNotAllowedException(
        `Notification with ID ${id} is not found!`,
      );
    }
    return new HttpException(findNotif, HttpStatus.OK);
  }

  @Get('user/:user_id')
  @ApiParam({
    name: 'user_id',
    type: String,
    example: 'get this ID from Notification table',
  })
  @ApiOperation({
    summary: 'get notification by user_id',
  })
  async findByUserId(@Param('user_id') id: string) {
    const findNotif = await this.notificationService.findByUserId(id);
    if (!findNotif) {
      throw new MethodNotAllowedException(
        `Notification with ID ${id} is not found!`,
      );
    }
    return new HttpException(findNotif, HttpStatus.OK);
  }

  @Patch(':notification_id')
  @ApiParam({
    name: 'notification_id',
    type: String,
    example: 'get this ID from Notification table',
  })
  @ApiOperation({
    summary: 'update notification by notification_id',
  })
  async update(
    @Param('notification_id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    const findNotif = await this.notificationService.findByUserId(id);
    if (!findNotif) {
      throw new MethodNotAllowedException(
        `Notification with ID ${id} is not found!`,
      );
    }
    const updateNotif = await this.notificationService.update(
      id,
      updateNotificationDto,
    );
    return new HttpException(updateNotif, HttpStatus.OK);
  }
}
