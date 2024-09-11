import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  NotFoundException,
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
import { Role, User } from '@prisma/client';
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
    const allTimeBlock = await this.adminTimeBlockService.findAll();
    return new HttpException(allTimeBlock, HttpStatus.CREATED);
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
    const currTimeBlock = await this.adminTimeBlockService.findById(id);

    if (!currTimeBlock) {
      throw new NotFoundException(`time block with id ${id} is not found!`);
    }

    return new HttpException(currTimeBlock, HttpStatus.CREATED);
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

    if (!findOrderWave) {
      throw new NotFoundException(`time block with id ${id} is not found!`);
    }

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
    const currUser = req.user as User;

    if (currUser.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not admin!`,
      );
    }

    const newAdminTimeBlock = await this.adminTimeBlockService.create(
      currUser.user_id,
      insertAdminTimeBlockDto,
    );
    return new HttpException(newAdminTimeBlock, HttpStatus.CREATED);
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
    const currUser = req.user as User;

    if (currUser.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not admin!`,
      );
    }
    const currTimeBlock = await this.adminTimeBlockService.findById(id);
    if (!currTimeBlock) {
      throw new NotFoundException(`time block with id ${id} is not found!`);
    }

    const updateTimeBlock = await this.adminTimeBlockService.updateById(
      id,
      insertAdminTimeBlockDto,
    );
    return new HttpException(updateTimeBlock, HttpStatus.CREATED);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete admin time block by id (admin authorization)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the admin time block',
    type: 'string',
    example: 'input here!',
  })
  async deleteById(@Req() req: Request, @Param('id') id: string) {
    const currUser = req.user as User;
    if (currUser.role !== Role.ADMIN) {
      throw new MethodNotAllowedException(
        `user ${currUser.email} is not admin!`,
      );
    }

    const currTimeBlock = await this.adminTimeBlockService.findById(id);
    if (!currTimeBlock) {
      throw new NotFoundException(`time block with id ${id} is not found!`);
    }
    const deleteTimeBlock = await this.adminTimeBlockService.deleteById(id);
    return new HttpException(deleteTimeBlock, HttpStatus.CREATED);
  }
}
