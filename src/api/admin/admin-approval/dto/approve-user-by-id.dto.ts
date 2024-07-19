import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApproveUserByIdDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '51da84e5-44ae-4c9f-809a-318ef1ea0126',
    description: 'The email of the user that need to be approved',
    required: true,
  })
  id: string;
}
