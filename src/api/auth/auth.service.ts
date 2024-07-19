import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const loggedUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!loggedUser) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const verifyPass = await bcrypt.compare(password, loggedUser.password);
    if (!verifyPass) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    const payload = {
      user_id: loggedUser.user_id,
      email,
      role: loggedUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, password, phone, name, street, grade } = registerAuthDto;
    const emailCheckUser = await this.prisma.user.findFirst({
      where: { email },
    });
    if (emailCheckUser) {
      throw new BadRequestException(`Email ${email} already used!`);
    }
    const phoneCheckUser = await this.prisma.userDetail.findUnique({
      where: { phone },
    });
    if (phoneCheckUser) {
      throw new BadRequestException(`Phone number ${phone} already used!`);
    }
    // DEFAULT DUMMY DATA
    const dummyData = {
      role: Role.DEFAULT,
      is_email_verified: false,
      is_phone_verified: false,
      is_admin_approved: false,
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: dummyData.role,
        user_detail: {
          create: {
            profile_image: 'dummy.png',
            phone,
            name,
            street,
            grade,
            is_admin_approved: dummyData.is_admin_approved,
            is_email_verified: dummyData.is_email_verified,
            is_phone_verified: dummyData.is_phone_verified,
          },
        },
      },
    });
    const payload = {
      user_id: newUser.user_id,
      email,
      role: dummyData.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
