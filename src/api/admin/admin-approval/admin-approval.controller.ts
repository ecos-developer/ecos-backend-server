import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminApprovalService } from './admin-approval.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/api/auth/guards/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
import { ApproveUserByIdDto } from './dto/approve-user-by-id.dto';

@ApiTags('Admin Approval (token required, admin authorized)')
@Controller('admin-approval')
@ApiBearerAuth('access-token')
export class AdminApprovalController {
  constructor(private readonly adminApprovalService: AdminApprovalService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'get all user' })
  async getAllUser(@Req() req: Request) {
    return await this.adminApprovalService.getAllUser(req.user as User);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary:
      'admin authorization for approve or disapprove user registration by user id',
  })
  @ApiBody({
    description: 'approve user registration by email',
    type: ApproveUserByIdDto,
  })
  async approveUserById(
    @Req() req: Request,
    @Body() approveUserByIdDto: ApproveUserByIdDto,
  ) {
    return await this.adminApprovalService.approveUserById(
      req.user as User,
      approveUserByIdDto,
    );
  }
}
