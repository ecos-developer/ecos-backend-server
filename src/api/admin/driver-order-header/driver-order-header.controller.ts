import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { DriverOrderHeaderService } from './driver-order-header.service';
import { CreateDriverOrderHeaderDto } from './dto/create-driver-order-header.dto';
import { UpdateDriverOrderHeaderDto } from './dto/update-driver-order-header.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('DriverOrderHeader Table (token required)')
@ApiBearerAuth('access-token')
@Controller('driver-order-header')
@UseGuards(JwtAuthGuard)
export class DriverOrderHeaderController {
  constructor(
    private readonly driverOrderHeaderService: DriverOrderHeaderService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'insert driver order header' })
  async create(@Body() createDriverOrderHeaderDto: CreateDriverOrderHeaderDto) {
    const driverOrderHeader = await this.driverOrderHeaderService.findByPairs(
      createDriverOrderHeaderDto.driver_id,
      createDriverOrderHeaderDto.time_block_id,
    );

    if (driverOrderHeader) {
      throw new MethodNotAllowedException(
        `driver ${createDriverOrderHeaderDto.driver_id} is already book this admin time block! Duplicate pairs driver_id and time_block_id detected!`,
      );
    }

    const newDriverOrderHeader = await this.driverOrderHeaderService.create(
      createDriverOrderHeaderDto,
    );
    return new HttpException(newDriverOrderHeader, HttpStatus.CREATED);
  }

  @Get()
  @ApiOperation({ summary: 'find all driver order header' })
  async findAll() {
    const allDriverOrder = await this.driverOrderHeaderService.findAll();
    return new HttpException(allDriverOrder, HttpStatus.CREATED);
  }

  @Get(':order_id')
  @ApiOperation({ summary: 'find driver order by id' })
  @ApiParam({
    name: 'order_id',
    description: 'order_id of the driver order',
    type: String,
    example: 'get this from DriverOrderHeader table',
  })
  async findOne(@Param('order_id') id: string) {
    const currDriverOrder = await this.driverOrderHeaderService.findOne(id);
    return new HttpException(currDriverOrder, HttpStatus.CREATED);
  }

  @Get('driver/:user_id')
  @ApiOperation({ summary: 'find driver order by user_id of a specific driver' })
  @ApiParam({
    name: 'user_id',
    description: 'user_id of the driver order',
    type: String,
    example: 'get this from User table',
  })
  async findByUserIdDriver(@Param('user_id') id: string) {
    const currDriverOrder = await this.driverOrderHeaderService.findByUserIdDriver(id);
    return new HttpException(currDriverOrder, HttpStatus.CREATED);
  }

  @Patch(':order_id')
  @ApiOperation({
    summary: 'update driver order by id',
    description: `
      - all of the field is optional
      - meant for update status order driver (will be handled by admin)
    `,
  })
  @ApiParam({
    name: 'order_id',
    description: 'order_id of the driver order',
    type: String,
    example: 'get this id from GET DriverOrderHeader',
  })
  async update(
    @Param('order_id') id: string,
    @Body() updateDriverOrderHeaderDto: UpdateDriverOrderHeaderDto,
  ) {
    const findDriverById = await this.driverOrderHeaderService.findOne(id);
    if (!findDriverById) {
      throw new NotFoundException(
        `driver order header with id ${id} is not found!`,
      );
    }
    return this.driverOrderHeaderService.update(id, updateDriverOrderHeaderDto);
  }
}
