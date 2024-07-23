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
  MethodNotAllowedException,
} from '@nestjs/common';
import { RealtimeCustomerEachDayPickupService } from './realtime-customer-each-day-pickup.service';
import { CreateRealtimeCustomerEachDayPickupDto } from './dto/create-realtime-customer-each-day-pickup.dto';
import { UpdateRealtimeCustomerEachDayPickupDto } from './dto/update-realtime-customer-each-day-pickup.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('RealtimeCustomerEachDayPickup (token required)')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('realtime-customer-each-day-pickup')
export class RealtimeCustomerEachDayPickupController {
  constructor(
    private readonly realtimeCustomerEachDayPickupService: RealtimeCustomerEachDayPickupService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create new RealtimeCustomerEachDayPickup',
  })
  @ApiBody({
    description: 'create new',
    type: CreateRealtimeCustomerEachDayPickupDto,
  })
  async create(
    @Body()
    createRealtimeCustomerEachDayPickupDto: CreateRealtimeCustomerEachDayPickupDto,
  ) {
    const newPickup = await this.realtimeCustomerEachDayPickupService.create(
      createRealtimeCustomerEachDayPickupDto,
    );
    return new HttpException(newPickup, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({
    summary: 'get all RealtimeCustomerEachDayPickup',
  })
  async findAll() {
    const allPickup = await this.realtimeCustomerEachDayPickupService.findAll();
    return new HttpException(allPickup, HttpStatus.OK);
  }

  @Get(':pickup_id')
  @ApiOperation({
    summary: 'get RealtimeCustomerEachDayPickup by ID',
  })
  @ApiParam({
    name: 'pickup_id',
    description: 'pickup_id for the RealtimeCustomerEachDayPickup',
    type: String,
    example: 'get this ID from RealtimeCustomerEachDayPickup table',
  })
  async findOne(@Param('pickup_id') id: string) {
    const findPickup =
      await this.realtimeCustomerEachDayPickupService.findOne(id);

    if (!findPickup) {
      throw new MethodNotAllowedException(
        `RealtimeCustomerEachDayPickup with id $P{id} is not found!`,
      );
    }
    return new HttpException(findPickup, HttpStatus.OK);
  }

  @Patch(':pickup_id')
  @ApiOperation({
    summary: 'update RealtimeCustomerEachDayPickup by ID',
  })
  @ApiParam({
    name: 'pickup_id',
    description: 'pickup_id for the RealtimeCustomerEachDayPickup',
    type: String,
    example: 'get this ID from RealtimeCustomerEachDayPickup table',
  })
  @ApiBody({
    description: 'update',
    type: UpdateRealtimeCustomerEachDayPickupDto,
  })
  async update(
    @Param('pickup_id') id: string,
    @Body()
    updateRealtimeCustomerEachDayPickupDto: UpdateRealtimeCustomerEachDayPickupDto,
  ) {
    const findPickup =
      await this.realtimeCustomerEachDayPickupService.findOne(id);

    if (!findPickup) {
      throw new MethodNotAllowedException(
        `RealtimeCustomerEachDayPickup with id $P{id} is not found!`,
      );
    }

    const updatePickup = await this.realtimeCustomerEachDayPickupService.update(
      id,
      updateRealtimeCustomerEachDayPickupDto,
    );
    return new HttpException(updatePickup, HttpStatus.OK);
  }
}
