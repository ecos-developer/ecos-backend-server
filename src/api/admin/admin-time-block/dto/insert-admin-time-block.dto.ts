import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InsertAdminTimeBlockDto {
  @IsString()
  @ApiProperty({
    description: 'Start date order for driver',
    type: String,
    example: '2024-07-15T00:00:00Z',
  })
  start_date: string;

  @IsString()
  @ApiProperty({
    description: 'End date order for driver',
    type: String,
    example: '2024-08-16T00:00:00Z',
  })
  end_date: string;

  @IsString()
  @ApiProperty({
    description: 'start journey date order for driver',
    type: String,
    example: '2024-08-16T00:00:00Z',
  })
  start_journey_date: string;

  @IsString()
  @ApiProperty({
    description: 'End journey date order for driver',
    type: String,
    example: '2024-08-16T00:00:00Z',
  })
  end_journey_date: string;

  @IsString()
  @ApiProperty({
    description: 'Start pickup for driver',
    type: String,
    example: '07:00',
  })
  start_pickup: string;

  @IsString()
  @ApiProperty({
    description: 'End pickup for driver',
    type: String,
    example: '14:00',
  })
  end_pickup: string;
}
