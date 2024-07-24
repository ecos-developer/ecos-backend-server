import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminTimeBlockService } from './admin-time-block.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
import { InsertAdminTimeBlockDto } from './dto/insert-admin-time-block.dto';

@ApiTags('AdminTimeBlock Table (token required)')
@ApiBearerAuth('access-token')
@Controller('admin-time-block')
@UseGuards(JwtAuthGuard)
export class AdminTimeBlockController {
  constructor(private readonly adminTimeBlockService: AdminTimeBlockService) {}

  @Get('')
  @ApiOperation({ summary: 'get all admin time block available' })
  async findAll() {
    return await this.adminTimeBlockService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get specific admin time block by id' })
  @ApiParam({
    name: 'id',
    description: 'ID of the admin time block',
    type: 'string',
    example: '2c1390a4-0b50-48fb-8145-bd8a90558fc7',
  })
  async findById(@Param('id') id: string) {
    return await this.adminTimeBlockService.findById(id);
  }

  @Get('driver/:driver_id')
  @ApiOperation({ summary: 'get specific admin time block by driver_id' })
  @ApiParam({
    name: 'driver_id',
    description: 'ID of the User with role DRIVER',
    example: 'get this ID from table User',
  })
  async findByDriverId(@Param('driver_id') id: string) {
    const findOrderWave = await this.adminTimeBlockService.findByDriverId(id);
    return new HttpException(findOrderWave, HttpStatus.OK);
  }

  @Post('')
  @ApiOperation({
    summary: 'create new time block for driver (admin authorization)',
  })
  async create(
    @Req() req: Request,
    @Body() insertAdminTimeBlockDto: InsertAdminTimeBlockDto,
  ) {
    return await this.adminTimeBlockService.create(
      req.user as User,
      insertAdminTimeBlockDto,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update admin time block by id (admin authorization)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the admin time block',
    type: 'string',
    example: '2c1390a4-0b50-48fb-8145-bd8a90558fc7',
  })
  async updateById(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() insertAdminTimeBlockDto: InsertAdminTimeBlockDto,
  ) {
    return await this.adminTimeBlockService.updateById(
      req.user as User,
      id,
      insertAdminTimeBlockDto,
    );
  }
}
