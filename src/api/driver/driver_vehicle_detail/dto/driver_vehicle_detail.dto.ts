import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

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
  @ApiProperty({ example: 3, description: 'vehicle capacity' })
  vehicle_capacity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '6961',
    description: 'vehicle number plate',
  })
  vehicle_number_plate: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '2502036262',
    description: 'child binusian id',
  })
  child_binusian_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Johevin',
    description: 'child name',
  })
  child_name: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'child grade',
  })
  child_grade: number;
}
