import { Injectable } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';
import { NotificationService } from 'src/api/notification/notification.service';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseService,
    private readonly sse: SseConfigService,
    private readonly notification: NotificationService,
  ) {}
  async create(createChatMessageDto: CreateChatMessageDto) {
    const newChat = await this.prisma.chatMessage.create({
      data: {
        ...createChatMessageDto,
      },
      include: {
        user: {
          include: {
            user_detail: true,
          },
        },
        room_chat: {
          include: {
            driver_order_header: {
              include: {
                user: {
                  include: {
                    user_detail: true,
                  },
                },
                customer_order_header: {
                  include: {
                    user: {
                      include: {
                        user_detail: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    await this.firebase.chatMessageRealtime(
      this.sse.ROOMCHAT_OBSERVABLE_STRING,
      createChatMessageDto.order_id,
    );

    const userIds = [
      newChat.room_chat.driver_order_header.user.user_id, // Driver order user_id
      ...newChat.room_chat.driver_order_header.customer_order_header.map(
        (order) => order.user.user_id, // Customer order user_ids
      ),
    ];

    for (const user_id of userIds) {
      // SUCCESS UPDATE CUSTOMER PAYMENT NOTIF FOR DRIVER
      const driverNotifData = {
        title: `New message from ${newChat.user.user_detail.name}`,
        body: createChatMessageDto.message,
        user_id,
      };
      await this.notification.handlePushNotification(driverNotifData);
    }

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
