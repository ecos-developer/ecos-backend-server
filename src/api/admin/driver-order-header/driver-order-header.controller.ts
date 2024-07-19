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
    const newDriverORderHeader = await this.driverOrderHeaderService.create(
      createDriverOrderHeaderDto,
    );
    return new HttpException(newDriverORderHeader, HttpStatus.CREATED);
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
    example: 'b8cff7ec-cbf6-4788-84ea-71fe9c672dfb',
  })
  async findOne(@Param('order_id') id: string) {
    const currDriverOrder = await this.driverOrderHeaderService.findOne(id);
    return new HttpException(currDriverOrder, HttpStatus.CREATED);
  }

  @Patch(':order_id')
  @ApiOperation({ summary: 'update driver order by id' })
  @ApiParam({
    name: 'order_id',
    description: 'order_id of the driver order',
    type: String,
    example: 'b8cff7ec-cbf6-4788-84ea-71fe9c672dfb',
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
