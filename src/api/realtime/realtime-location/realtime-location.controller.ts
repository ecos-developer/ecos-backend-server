import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  MethodNotAllowedException,
  Sse,
} from '@nestjs/common';
import { RealtimeLocationService } from './realtime-location.service';
import { CreateRealtimeLocationDto } from './dto/create-realtime-location.dto';
import { UpdateRealtimeLocationDto } from './dto/update-realtime-location.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SseConfigService } from 'src/config/sse.config.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map } from 'rxjs';

@ApiTags('RealtimeLocation table (token required)')
@Controller('realtime-location')
export class RealtimeLocationController {
  constructor(
    private readonly sse: SseConfigService,
    private readonly event: EventEmitter2,
    private readonly realtimeLocationService: RealtimeLocationService,
  ) {}

  @Sse('sse/:user_id')
  @ApiOperation({
    summary:
      'Stream location by user id when the create or update endpoint is triggered',
  })
  @ApiParam({
    name: 'user_id',
    type: String,
    example: 'get this ID from User table',
  })
  sseLocation(@Param('user_id') id: string) {
    return fromEvent(
      this.event,
      `${this.sse.LOCATION_OBSERVABLE_STRING}/${id}`,
    ).pipe(
      map((data) => {
        return { data: data };
      }),
    );
  }

  @Post()
  @ApiOperation({ summary: 'post new location for each user' })
  @ApiBody({
    description: 'Endpoint for create RealtimeLocation',
    type: CreateRealtimeLocationDto,
  })
  async create(@Body() createRealtimeLocationDto: CreateRealtimeLocationDto) {
    const findLoc = await this.realtimeLocationService.findOne(
      createRealtimeLocationDto.user_id,
    );
    if (findLoc) {
      const updateLoc = await this.realtimeLocationService.update(
        createRealtimeLocationDto.user_id,
        createRealtimeLocationDto,
      );

      return new HttpException(updateLoc, HttpStatus.OK);
    }
    const newLoc = await this.realtimeLocationService.create(
      createRealtimeLocationDto,
    );
    return new HttpException(newLoc, HttpStatus.OK);
  }

  @Get()
  @ApiOperation({ summary: 'get all real time location of user' })
  async findAll() {
    const allLoc = await this.realtimeLocationService.findAll();
    return new HttpException(allLoc, HttpStatus.OK);
  }

  @Get(':user_id')
  @ApiParam({
    name: 'user_id',
    description: 'user_id for the customer order',
    type: String,
    example: 'get this ID from User table',
  })
  async findOne(@Param('user_id') id: string) {
    const findLoc = await this.realtimeLocationService.findOne(id);
    if (!findLoc) {
      throw new MethodNotAllowedException(
        `RealtimeLocation with ID ${id} is not found!`,
      );
    }
    return new HttpException(findLoc, HttpStatus.OK);
  }

  @Patch(':user_id')
  @ApiParam({
    name: 'user_id',
    description: 'user_id for the customer order',
    type: String,
    example: 'get this ID from User table',
  })
  @ApiOperation({
    summary: 'update RealtimeLocation by ID',
  })
  @ApiBody({
    description: 'Endpoint for update RealtimeLocation',
    type: UpdateRealtimeLocationDto,
  })
  async update(
    @Param('user_id') id: string,
    @Body() updateRealtimeLocationDto: UpdateRealtimeLocationDto,
  ) {
    const findLoc = await this.realtimeLocationService.findOne(id);
    if (!findLoc) {
      throw new MethodNotAllowedException(
        `RealtimeLocation with ID ${id} is not found!`,
      );
    }
    const updateLoc = await this.realtimeLocationService.update(
      id,
      updateRealtimeLocationDto,
    );

    return new HttpException(updateLoc, HttpStatus.OK);
  }
}
