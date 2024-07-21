import { Module } from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { RoomChatController } from './room-chat.controller';

@Module({
  controllers: [RoomChatController],
  providers: [RoomChatService],
})
export class RoomChatModule {}
