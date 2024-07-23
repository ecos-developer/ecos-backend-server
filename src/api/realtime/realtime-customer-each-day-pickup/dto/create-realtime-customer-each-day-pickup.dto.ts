import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRealtimeCustomerEachDayPickupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'get this from CustomerOrderHeader table',
  })
  customer_order_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-07-15T00:00:00Z',
  })
  date: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
  })
  is_canceled: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
  })
  is_pickup: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
  })
  is_arrived: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2024-07-15T00:00:00Z',
  })
  start_pickup: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '2024-07-15T00:00:00Z',
  })
  end_pickup: string;
}
