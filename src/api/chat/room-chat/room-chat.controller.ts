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
