import {
  Body,
  Controller,
  Get,
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
import { User } from '@prisma/client';
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
  @ApiOperation({ summary: 'get driver detail by token' })
  async findOne(@Req() req: Request) {
    return await this.driverVehicleDetailService.findOne(req.user as User);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UsePipes(new ParseDriverDetailPipe())
  @UseInterceptors(FileInterceptor('vehicle_image_file'))
  @ApiOperation({
    summary:
      "create driver's vehicle detail by token (optional field, without payment)",
  })
  @ApiBody({
    description: 'intended for driver only',
    type: DriverVehicleDetailDto,
  })
  async create(
    @Req() req: Request,
    @UploadedFile() vehicle_image_file: Express.Multer.File,
    @Body() driverVehicleDetailDto: DriverVehicleDetailDto,
  ) {
    return await this.driverVehicleDetailService.create(
      req.user as User,
      vehicle_image_file,
      driverVehicleDetailDto,
    );
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
