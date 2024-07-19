import { Module } from '@nestjs/common';
import { AdminApprovalService } from './admin-approval.service';
import { AdminApprovalController } from './admin-approval.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AdminApprovalController],
  providers: [AdminApprovalService, JwtStrategy],
})
export class AdminApprovalModule {}
