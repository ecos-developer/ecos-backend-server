import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class DriverVehicleDetailDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'vehicle image input',
    required: false,
  })
  vehicle_image_file?: string;
  vehicle_image?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'jeep',
    description: 'driver vehicle category',
    required: false,
  })
  vehicle_category?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'old fashioned jeep',
    description: 'The name of the user',
    required: false,
  })
  vehicle_model?: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ example: 3, description: 'vehicle capacity', required: false })
  vehicle_capacity?: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6961',
    description: 'vehicle number plate',
    required: false,
  })
  vehicle_number_plate?: string;
}
