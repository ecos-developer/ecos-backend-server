import { Module } from '@nestjs/common';
import { UserDetailService } from './user_detail.service';
import { UserDetailController } from './user_detail.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/api/auth/strategies/jwt.strategy';
import { EnvService } from 'src/api/env/env.service';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [UserDetailController],
  providers: [UserDetailService, EnvService, JwtStrategy],
})
export class UserDetailModule {}
