import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
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
  @ApiResponse({ status: HttpStatus.OK, description: 'RETURNED ALL MY USERS' })
  @Get('/list')
  async getAllUsers(@Res() res: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUsersList());
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserCreateResponse })
  @Post('create')
  async createUserProfile(@Body() body: UserCreateProfileDto, @Res() res: any) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'USER IS DELETED',
  })
  @Delete(':id')
  async deleteUserAccount(@Res() res: any, @Param('id') id: string) {
    return res
      .status(HttpStatus.NO_CONTENT)
      .json(await this.userService.deleteUserAccount(id));
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserCreateResponse })
  @Put('update/:id')
  async updateUserProfile(
    @Body() body: Partial<UserCreateProfileDto>,
    @Res() res: any,
    @Param('id') id: string,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.updateUser(body, id));
  }
}
