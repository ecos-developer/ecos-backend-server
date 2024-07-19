import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserDetailDto } from './dto/user_detail.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserDetailService {
  constructor(private prisma: PrismaService) {}

  async findOne(user: User) {
    const userDetail = await this.prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
      include: {
        user_detail: true,
      },
    });

    if (!userDetail)
      throw new NotFoundException(
        `user with email ${user.email} is not found!`,
      );

    return new HttpException(userDetail, HttpStatus.CREATED);
  }

  async update(
    user: User,
    profile_image_file: Express.Multer.File,
    userDetailDto: UserDetailDto,
  ) {
    console.log(userDetailDto);
    try {
      if (profile_image_file !== undefined) {
        userDetailDto.profile_image = profile_image_file.filename;
      }
      const checkUser = await this.prisma.user.findUnique({
        where: {
          user_id: user.user_id,
        },
      });
      if (!checkUser) {
        throw new NotFoundException(`email ${user.email} is not found!`);
      }
      if (userDetailDto.phone !== undefined && userDetailDto.phone !== '') {
        const phoneCheck = await this.prisma.userDetail.findUnique({
          where: {
            phone: userDetailDto.phone,
          },
        });
        if (phoneCheck) {
          throw new BadRequestException(
            `phone ${userDetailDto.phone} is already used!`,
          );
        }

        const updateUser = await this.prisma.user.update({
          where: {
            user_id: user.user_id,
          },
          data: {
            role: userDetailDto.role,
            user_detail: {
              update: {
                data: {
                  profile_image:
                    userDetailDto.profile_image === ''
                      ? null
                      : userDetailDto.profile_image,
                  phone: userDetailDto.phone,
                  name: userDetailDto.name,
                  street: userDetailDto.street,
                  grade: parseInt(userDetailDto.grade.toString()),
                  is_email_verified: userDetailDto.is_email_verified as boolean,
                  is_admin_approved: userDetailDto.is_admin_approved as boolean,
                  is_phone_verified: userDetailDto.is_phone_verified as boolean,
                },
              },
            },
          },
          include: {
            user_detail: true,
          },
        });

        return new HttpException(updateUser, HttpStatus.CREATED);
      }

      const updateUser = await this.prisma.user.update({
        where: {
          user_id: user.user_id,
        },
        data: {
          role: userDetailDto.role,
          user_detail: {
            update: {
              data: {
                profile_image: userDetailDto.profile_image,
                name: userDetailDto.name,
                street: userDetailDto.street,
                grade: userDetailDto.grade,
                is_email_verified: userDetailDto.is_email_verified,
                is_phone_verified: userDetailDto.is_phone_verified,
              },
            },
          },
        },
        include: {
          user_detail: true,
        },
      });

      return new HttpException(updateUser, HttpStatus.CREATED);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          `An unexpected error occurred : ${error}`,
        );
      }
    }
  }
}
