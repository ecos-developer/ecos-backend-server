import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { SseConfigService } from 'src/config/sse.config.service';
import { RoomChatService } from '../room-chat/room-chat.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [ChatMessageController],
  providers: [
    ChatMessageService,
    JwtStrategy,
    SseConfigService,
    RoomChatService,
  ],
})
export class ChatMessageModule {}
