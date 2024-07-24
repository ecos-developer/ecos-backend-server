import { Injectable } from '@nestjs/common';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class RoomChatService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoomChatDto: CreateRoomChatDto) {
    const newRoomChat = await this.prisma.roomChat.create({
      data: {
        ...createRoomChatDto,
      },
    });
    return newRoomChat;
  }

  async findAll() {
    const allRoomChat = await this.prisma.roomChat.findMany({
      include: {
        chat_message: true,
        driver_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
                driver_detail: {
                  include: {
                    payment: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return allRoomChat;
  }

  async findOne(order_id: string) {
    const findRoomChat = await this.prisma.roomChat.findFirst({
      where: {
        order_id,
      },
      include: {
        chat_message: true,
        driver_order_header: {
          include: {
            user: {
              include: {
                user_detail: true,
                driver_detail: {
                  include: {
                    payment: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return findRoomChat;
  }

  async findByUserId(user: User) {
    if (user.role === Role.DRIVER) {
      const findRoomChat = await this.prisma.roomChat.findMany({
        include: {
          chat_message: true,
          driver_order_header: {
            include: {
              user: {
                where: {
                  user_id: user.user_id,
                },
                include: {
                  user_detail: true,
                  driver_detail: {
                    include: {
                      payment: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return findRoomChat;
    }
    const findRoomChat = await this.prisma.roomChat.findMany({
      include: {
        chat_message: true,
        driver_order_header: {
          include: {
            customer_order_header: {
              include: {
                user: {
                  where: {
                    user_id: user.user_id,
                  },
                },
              },
            },
            user: {
              include: {
                user_detail: true,
                driver_detail: {
                  include: {
                    payment: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return findRoomChat;
  }

  async update(order_id: string, updateRoomChatDto: UpdateRoomChatDto) {
    const updateRoomChat = await this.prisma.roomChat.update({
      where: {
        order_id,
      },
      data: {
        ...updateRoomChatDto,
      },
    });
    return updateRoomChat;
  }
}
