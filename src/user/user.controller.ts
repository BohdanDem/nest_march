import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserCreateProfileDto, UserCreateResponse } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiExtraModels(UserCreateResponse)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  async getAllUsers() {
    return await this.userService.getUsersList();
  }

  @Get('/:userId/profile')
  async getUserInfo(@Param() param: { userId: string }) {
    return await this.userService.getOneUser(param.userId);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserCreateResponse })
  @Post('create')
  async createUserProfile(@Body() body: UserCreateProfileDto, @Res() res: any) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @Post('/address/:id')
  async addUserAddress() {}

  @Post('/city/:id')
  async updateUserData() {}

  @Delete(':id')
  async deleteUserAccount() {}
}
