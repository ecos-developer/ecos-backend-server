import { Module } from '@nestjs/common';
import { RoomChatService } from './room-chat.service';
import { RoomChatController } from './room-chat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [RoomChatController],
  providers: [RoomChatService, JwtStrategy],
})
export class RoomChatModule {}
