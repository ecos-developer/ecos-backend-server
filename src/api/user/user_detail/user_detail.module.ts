import { Module } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailController } from './user_detail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [UserDetailController],
  providers: [
    UserDetailService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
  ],
})
export class UserDetailModule {}
