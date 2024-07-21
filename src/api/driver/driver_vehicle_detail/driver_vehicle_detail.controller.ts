import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { DriverVehicleDetailService } from './driver_vehicle_detail.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { DriverVehicleDetailDto } from './dto/driver_vehicle_detail.dto';
import { Role, User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseDriverDetailPipe } from './pipe/parse_driver_detail.pipe';

@ApiTags('driver detail (token required, driver authorized)')
@ApiBearerAuth('access-token')
@Controller('driver-vehicle-detail')
export class DriverVehicleDetailController {
  constructor(
    private readonly driverVehicleDetailService: DriverVehicleDetailService,
  ) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'get driver detail by token',
    description: `
      - validation driver by token
    `,
  })
  async findOne(@Req() req: Request) {
    // DRIVER ONLY
    const user = req.user as User;
    if (user.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }

    const driverDetail = await this.driverVehicleDetailService.findOne(
      req.user as User,
    );
    return new HttpException(driverDetail, HttpStatus.CREATED);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      "create driver's vehicle detail by token (optional field, without payment)",
    description: `
      - validation driver by token
      - validation is driver detail already created
    `,
  })
  @ApiBody({
    description: 'intended for driver only',
    type: DriverVehicleDetailDto,
  })
  async create(
    @Req() req: Request,
    @Body() driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    const user = req.user as User;
    if (user.role !== Role.DRIVER) {
      throw new MethodNotAllowedException(`user ${user.email} is not driver!`);
    }

    const findDriverDetail =
      await this.driverVehicleDetailService.findOne(user);
    if (findDriverDetail.driver_detail) {
      throw new MethodNotAllowedException(
        `user ${user.email} is already create driver detail, you need to perform update driver detail!`,
      );
    }

    const createDriverVehicle = await this.driverVehicleDetailService.create(
      req.user as User,
      driverVehicleDetailDto,
    );

    return new HttpException(createDriverVehicle, HttpStatus.CREATED);
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ParseDriverDetailPipe())
  @UseInterceptors(FileInterceptor('vehicle_image_file'))
  @ApiOperation({
    summary:
      "update driver's vehicle detail by token (optional field, without paymnet)",
  })
  @ApiBody({
    description: 'intended for driver only',
    type: DriverVehicleDetailDto,
  })
  async update(
    @Req() req: Request,
    @UploadedFile() vehicle_image_file: Express.Multer.File,
    @Body() driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    return await this.driverVehicleDetailService.update(
      req.user as User,
      vehicle_image_file,
      driverVehicleDetailDto,
    );
  }
}
