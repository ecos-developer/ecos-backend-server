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
  Req,
} from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

@ApiTags('RoomChat Table (token required)')
@ApiBearerAuth('access-token')
@Controller('room-chat')
@UseGuards(JwtAuthGuard)
export class RoomChatController {
  constructor(private readonly roomChatService: RoomChatService) {}

  @Post()
  @ApiOperation({
    summary: 'create new room chat',
    description: `
      - each DriverOrderHeader only has one RoomChat
    `,
  })
  @ApiBody({
    description: 'Create new room chat',
    type: CreateRoomChatDto,
  })
  async create(@Body() createRoomChatDto: CreateRoomChatDto) {
    const newRoomChat = await this.roomChatService.create(createRoomChatDto);
    return new HttpException(newRoomChat, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({
    summary: 'get all room chat',
  })
  async findAll() {
    const allRoomChat = await this.roomChatService.findAll();
    return new HttpException(allRoomChat, HttpStatus.OK);
  }

  @Get(':order_id')
  @ApiParam({
    name: 'order_id',
    description: 'from DriverOrderHeader',
    type: String,
    example: 'get this ID from PaymentHeader table',
  })
  async findOne(@Param('order_id') id: string) {
    const findRoomChat = await this.roomChatService.findOne(id);
    if (!findRoomChat) {
      throw new MethodNotAllowedException(
        `room chat with id ${id} is not found!`,
      );
    }
    return new HttpException(findRoomChat, HttpStatus.OK);
  }

  @Get('token')
  @ApiOperation({
    summary: 'fetch room chat by token',
    description: `
      - verified whether it is driver or customer
    `,
  })
  async findByUserId(@Req() req: Request) {
    const findRoomChat = await this.roomChatService.findByUserId(
      req.user as User,
    );
    if (!findRoomChat) {
      throw new MethodNotAllowedException(
        `${(req.user as User).email} did not have any room chat!`,
      );
    }
    return new HttpException(findRoomChat, HttpStatus.OK);
  }

  @Patch(':order_id')
  @ApiParam({
    name: 'order_id',
    description: 'from DriverOrderHeader',
    type: String,
    example: 'get this ID from PaymentHeader table',
  })
  @ApiBody({
    description: 'Update room chat by id',
    type: UpdateRoomChatDto,
  })
  async update(
    @Param('order_id') id: string,
    @Body() updateRoomChatDto: UpdateRoomChatDto,
  ) {
    const findRoomChat = await this.roomChatService.findOne(id);
    if (!findRoomChat) {
      throw new MethodNotAllowedException(
        `room chat with id ${id} is not found!`,
      );
    }

    const updateRoomChat = await this.roomChatService.update(
      id,
      updateRoomChatDto,
    );
    return new HttpException(updateRoomChat, HttpStatus.OK);
  }
}
