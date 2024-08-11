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
import { fromEvent, map } from 'rxjs';
import { SseConfigService } from 'src/config/sse.config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from '@prisma/client';
import { Request } from 'express';

@ApiTags('RoomChat Table (token required)')
@Controller('room-chat')
export class RoomChatController {
  constructor(
    private readonly sse: SseConfigService,
    private readonly event: EventEmitter2,
    private readonly roomChatService: RoomChatService,
  ) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
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

  @Get('')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'get all room chat',
  })
  async findAll() {
    const allRoomChat = await this.roomChatService.findAll();
    return new HttpException(allRoomChat, HttpStatus.OK);
  }

  @Get(':order_id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
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

  @Patch(':order_id')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
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

  @Sse('sse/:order_id')
  @ApiOperation({
    summary: 'Stream room chat when a new chat message is created',
  })
  @ApiParam({
    name: 'order_id',
    type: String,
    example: 'get this ID from DriverOrderHeader table',
  })
  sseRoomChats(@Param('order_id') id: string) {
    console.log('New SSE connection for order ID:', id);
    return fromEvent(
      this.event,
      `${this.sse.ROOMCHAT_OBSERVABLE_STRING}/${id}`,
    ).pipe(
      map((data) => {
        return { data: data };
      }),
    );
  }

  @Post('user')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async findRoomChatByUser(@Req() user: Request) {
    const roomChat = await this.roomChatService.findByUserToken(
      user.user as User,
    );
    if (!roomChat) {
      throw new MethodNotAllowedException(
        `user ${user.user} does not have room chat yet`,
      );
    }
    return new HttpException(roomChat, HttpStatus.OK);
  }
}
