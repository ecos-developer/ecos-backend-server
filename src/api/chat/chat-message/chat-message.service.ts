import { Injectable } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService,
    private readonly sse: SseConfigService,
  ) {}
  async create(createChatMessageDto: CreateChatMessageDto) {
    const newChat = await this.prisma.chatMessage.create({
      data: {
        ...createChatMessageDto,
      },
    });
    await this.firebase.chatMessageRealtime(
      this.sse.ROOMCHAT_OBSERVABLE_STRING,
      createChatMessageDto.order_id,
    );
    return newChat;
  }

  async findAll() {
    const allChat = await this.prisma.chatMessage.findMany({
      include: {
        room_chat: true,
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
          },
        },
      },
    });
    return allChat;
  }

  async findOne(chat_id: string) {
    const findChat = await this.prisma.chatMessage.findFirst({
      where: {
        chat_id,
      },
      include: {
        room_chat: true,
        user: {
          include: {
            user_detail: true,
            customer_detail: true,
          },
        },
      },
    });
    return findChat;
  }

  async update(chat_id: string, updateChatMessageDto: UpdateChatMessageDto) {
    const udpateChat = await this.prisma.chatMessage.update({
      where: {
        chat_id,
      },
      data: {
        ...updateChatMessageDto,
      },
    });
    return udpateChat;
  }
}
