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
} from '@nestjs/common';
import { RealtimeLocationService } from './realtime-location.service';
import { CreateRealtimeLocationDto } from './dto/create-realtime-location.dto';
import { UpdateRealtimeLocationDto } from './dto/update-realtime-location.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';

@ApiTags('RealtimeLocation table (token required)')
@ApiBearerAuth('access-token')
@Controller('realtime-location')
export class RealtimeLocationController {
  constructor(
    private readonly realtimeLocationService: RealtimeLocationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'post new location for each user' })
  async create(@Body() createRealtimeLocationDto: CreateRealtimeLocationDto) {
    const newLoc = await this.realtimeLocationService.create(
      createRealtimeLocationDto,
    );
    return new HttpException(newLoc, HttpStatus.OK);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.realtimeLocationService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.realtimeLocationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRealtimeLocationDto: UpdateRealtimeLocationDto,
  ) {
    return this.realtimeLocationService.update(+id, updateRealtimeLocationDto);
  }
}
