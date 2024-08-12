import { Module } from '@nestjs/common';
import { AdminApprovalService } from './admin-approval.service';
import { AdminApprovalController } from './admin-approval.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { SseConfigService } from 'src/config/sse.config.service';

@Module({
  imports: [PrismaModule, PassportModule, FirebaseModule],
  controllers: [AdminApprovalController],
  providers: [
    AdminApprovalService,
    JwtStrategy,
    FirebaseService,
    SseConfigService,
  ],
})
export class AdminApprovalModule {}
