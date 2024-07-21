import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('ChatMessages Table (token required)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('chat-message')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Post()
  @ApiOperation({
    summary: 'create new chat messages',
  })
  async create(@Body() createChatMessageDto: CreateChatMessageDto) {
    const newChat = await this.chatMessageService.create(createChatMessageDto);
    return new HttpException(newChat, HttpStatus.OK);
  }

  @Get()
  async findAll() {
    const allChat = await this.chatMessageService.findAll();
    return new HttpException(allChat, HttpStatus.OK);
  }

  @Get(':chat_id')
  @ApiParam({
    name: 'chat_id',
    type: String,
    example: 'get this ID from ChatMessage table',
  })
  async findOne(@Param('chat_id') id: string) {
    const findChat = await this.chatMessageService.findOne(id);
    if (!findChat) {
      throw new NotFoundException(`ChatMessage with id ${id} not found!`);
    }
    return new HttpException(findChat, HttpStatus.OK);
  }

  @Get(':chat_id')
  @ApiParam({
    name: 'chat_id',
    type: String,
    example: 'get this ID from ChatMessage table',
  })
  async update(
    @Param('chat_id') id: string,
    @Body() updateChatMessageDto: UpdateChatMessageDto,
  ) {
    const findChat = await this.chatMessageService.findOne(id);
    if (!findChat) {
      throw new NotFoundException(`ChatMessage with id ${id} not found!`);
    }
    const updateChat = await this.chatMessageService.update(
      id,
      updateChatMessageDto,
    );
    return new HttpException(updateChat, HttpStatus.OK);
  }
}
