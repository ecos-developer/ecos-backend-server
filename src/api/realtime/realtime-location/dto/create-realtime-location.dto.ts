import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRealtimeLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'get this from User table',
  })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-07-15T00:00:00Z',
  })
  date: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2.2,
  })
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2.2,
  })
  longitude: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Jl. Testing',
  })
  location: string;
}
