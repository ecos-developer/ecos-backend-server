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
  MethodNotAllowedException,
  Sse,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { Notification } from '@prisma/client';

@ApiTags('Notification table (token required)')
// @ApiBearerAuth('access-token')
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly prisma: PrismaService,
    private readonly event: EventEmitter2,
  ) {}

  onModuleInit() {
    this.event.on('create-notification', (notification: Notification) => {
      console.log('New notification created:', notification.content);
      // You can perform additional actions here, such as logging or further processing
    });
  }

  @Sse('sse')
  sseOrders() {
    return fromEvent(this.event, 'create-notification').pipe(
      map((data) => {
        return data;
      }),
    );
  }

  @Post()
  @ApiOperation({
    summary: 'create new notification',
  })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const newNotif = await this.notificationService.create(
      createNotificationDto,
    );
    return new HttpException(newNotif, HttpStatus.OK);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
