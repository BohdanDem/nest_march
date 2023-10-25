import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { UserCreateProfileDto } from './dto/user.dto';
import { UserService } from './user.service';

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

  @Post(':id')
  async addUserAddress() {}

  @Patch(':id')
  async updateUserData() {}

  @Delete(':id')
  async deleteUserAccount() {}

  @Post('create')
  async createUserProfile(@Body() body: UserCreateProfileDto, @Res() res: any) {
    console.log(12);
    // return this.userService.createUser(body);
    return res
      .status(HttpStatus.CREATED)
      .json(this.userService.createUser(body));
  }
}
