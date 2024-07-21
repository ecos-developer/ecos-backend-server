import { Injectable } from '@nestjs/common';
import { CreateRoomChatDto } from './dto/create-room-chat.dto';
import { UpdateRoomChatDto } from './dto/update-room-chat.dto';

@Injectable()
export class RoomChatService {
  create(createRoomChatDto: CreateRoomChatDto) {
    return 'This action adds a new roomChat';
  }

  findAll() {
    return `This action returns all roomChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomChat`;
  }

  update(id: number, updateRoomChatDto: UpdateRoomChatDto) {
    return `This action updates a #${id} roomChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomChat`;
  }
}
