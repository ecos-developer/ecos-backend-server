import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class DriverVehicleDetailDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'INSERT FIRST TO IMAGE SERVER!',
    description: 'vehicle image name',
  })
  vehicle_image: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'jeep',
    description: 'driver vehicle category',
  })
  vehicle_category: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'old fashioned jeep',
    description: 'The name of the user',
  })
  vehicle_model: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ example: 3, description: 'vehicle capacity' })
  vehicle_capacity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6961',
    description: 'vehicle number plate',
  })
  vehicle_number_plate: string;
}
