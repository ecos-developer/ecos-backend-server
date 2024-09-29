import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
} from '@nestjs/common';
import { UserNotificationDeviceService } from './user_notification_device.service';
import { CreateUserNotificationDeviceDto } from './dto/create-user_notification_device.dto';
import { UpdateUserNotificationDeviceDto } from './dto/update-user_notification_device.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('UserNotificationDevices Table (token required, all role authorized)')
@Controller('user-notification-device')
export class UserNotificationDeviceController {
  constructor(
    private readonly userNotificationDeviceService: UserNotificationDeviceService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create new notification devices',
  })
  async create(
    @Body() createUserNotificationDeviceDto: CreateUserNotificationDeviceDto,
  ) {
    const findUserById = await this.userNotificationDeviceService.findUserById(
      createUserNotificationDeviceDto.user_id,
    );
    if (!findUserById) {
      throw new MethodNotAllowedException(
        `User with user_id ${createUserNotificationDeviceDto.user_id} is not found!`,
      );
    }

    const newUserNotificationDevice =
      await this.userNotificationDeviceService.create(
        createUserNotificationDeviceDto,
      );

    return new HttpException(newUserNotificationDevice, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({
    summary: 'get all notification devices',
  })
  async findAll() {
    const allUserNotificationDevices =
      await this.userNotificationDeviceService.findAll();
    return new HttpException(allUserNotificationDevices, HttpStatus.OK);
  }

  @Get(':user_notification_device_id')
  @ApiOperation({
    summary: 'get notification device based its id',
  })
  @ApiParam({
    name: 'user_notification_device_id',
    description: 'user_notification_device_id for the notification devices',
    type: String,
    example: 'mana saya tau id nya',
  })
  async findOne(
    @Param('user_notification_device_id') user_notification_device_id: string,
  ) {
    const findUserNotificationDevice =
      await this.userNotificationDeviceService.findOne(
        user_notification_device_id,
      );
    if (!findUserNotificationDevice) {
      throw new MethodNotAllowedException(
        `UserNotificationDevices with id ${user_notification_device_id} is not found!`,
      );
    }
    return new HttpException(findUserNotificationDevice, HttpStatus.OK);
  }

  @Get('user/:user_id')
  @ApiOperation({
    summary: 'get notification device based on user_id',
  })
  @ApiParam({
    name: 'user_id',
    description: 'user_id from table users',
    type: String,
    example: 'mana saya tau id nya',
  })
  async findByUserId(@Param('user_id') user_id: string) {
    const findUserById =
      await this.userNotificationDeviceService.findUserById(user_id);
    if (!findUserById) {
      throw new MethodNotAllowedException(
        `User with user_id ${user_id} is not found!`,
      );
    }
    const findByUserId =
      await this.userNotificationDeviceService.findByUserId(user_id);
    if (!findByUserId) {
      throw new MethodNotAllowedException(
        `UserNotificationDevices with user_id ${user_id} is not found!`,
      );
    }
    return new HttpException(findByUserId, HttpStatus.OK);
  }

  @Patch(':user_notification_device_id')
  @ApiOperation({
    summary: 'update notification device based its id',
  })
  @ApiParam({
    name: 'user_notification_device_id',
    description: 'user_notification_device_id for the notification devices',
    type: String,
    example: 'mana saya tau id nya',
  })
  async update(
    @Param('user_notification_device_id') user_notification_device_id: string,
    @Body() updateUserNotificationDeviceDto: UpdateUserNotificationDeviceDto,
  ) {
    const findById = await this.userNotificationDeviceService.findOne(
      user_notification_device_id,
    );
    if (!findById) {
      throw new MethodNotAllowedException(
        `UserNotificationDevices with id ${user_notification_device_id} is not found!`,
      );
    }
    const updateById = await this.userNotificationDeviceService.update(
      user_notification_device_id,
      updateUserNotificationDeviceDto,
    );
    return new HttpException(updateById, HttpStatus.OK);
  }

  @Get('user-and-token/:user_id/:push_token')
  @ApiOperation({
    summary: 'update notification device based on user_id and token',
  })
  @ApiParam({
    name: 'user_id',
    description: 'user_id for the notification devices',
    type: String,
    example: 'mana saya tau user_id nya',
  })
  @ApiParam({
    name: 'push_token',
    description: 'push_token for the notification devices',
    type: String,
    example: 'mana saya tau push_token nya',
  })
  async findByIdAndToken(
    @Param('user_id') user_id: string,
    @Param('push_token') push_token: string,
  ) {
    const findByIdAndToken =
      await this.userNotificationDeviceService.findByIdAndPushToken(
        user_id,
        push_token,
      );
    if (!findByIdAndToken) {
      throw new MethodNotAllowedException(
        `UserNotificationDevices with user_id ${user_id} and push_token ${push_token} is not found!`,
      );
    }
    return new HttpException(findByIdAndToken, HttpStatus.OK);
  }

  @Delete('user-and-token/:user_id/:push_token')
  @ApiOperation({
    summary: 'update notification device based on user_id and token',
  })
  @ApiParam({
    name: 'user_id',
    description: 'user_id for the notification devices',
    type: String,
    example: 'mana saya tau user_id nya',
  })
  @ApiParam({
    name: 'push_token',
    description: 'push_token for the notification devices',
    type: String,
    example: 'mana saya tau push_token nya',
  })
  async removeByIdAndPushToken(
    @Param('user_id') user_id: string,
    @Param('push_token') push_token: string,
  ) {
    const findByIdAndToken =
      await this.userNotificationDeviceService.findByIdAndPushToken(
        user_id,
        push_token,
      );
    if (!findByIdAndToken) {
      throw new MethodNotAllowedException(
        `UserNotificationDevices with user_id ${user_id} and push_token ${push_token} is not found!`,
      );
    }
    const deleteById = await this.userNotificationDeviceService.removeById(
      findByIdAndToken.user_notification_device_id,
    );
    return new HttpException(deleteById, HttpStatus.OK);
  }

  @Delete(':user_notification_device_id')
  @ApiOperation({
    summary: 'update notification device based on its id',
  })
  @ApiParam({
    name: 'user_notification_device_id',
    description: 'user_notification_device_id for the notification devices',
    type: String,
    example: 'mana saya tau user_notification_device_id nya',
  })
  async removeById(
    @Param('user_notification_device_id') user_notification_device_id: string,
  ) {
    const findByIdAndToken = await this.userNotificationDeviceService.findOne(
      user_notification_device_id,
    );
    if (!findByIdAndToken) {
      throw new MethodNotAllowedException(
        `UserNotificationDevices with id ${user_notification_device_id} is not found!`,
      );
    }
    const deleteById = await this.userNotificationDeviceService.removeById(
      user_notification_device_id,
    );
    return new HttpException(deleteById, HttpStatus.OK);
  }
}
