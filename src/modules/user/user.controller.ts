import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { CityDecorator } from '../../common/decorators/city.decorator';
import { CityEnum } from '../../common/enum/city.enum';
import { CityGuard } from '../../common/guards/city.guard';
import { LogoutGuard } from '../../common/guards/logout.guard';
import {
  editFileName,
  imageFileFilter,
} from '../../common/utils/file.upload.utils';
import {
  UserLoginDto,
  UserLoginGoogleDto,
} from './dto/request/user-base.request.dto';
import { UserCreateRequestDto } from './dto/request/user-create.request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserUpdateRequestDto } from './dto/request/user-update.request.dto';
import { UserDetailsResponseDto } from './dto/response/user-details.response.dto';
import { UserListResponseDto } from './dto/response/user-list.response.dto';
import { UserResponseMapper } from './user.response.mapper';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list of users' })
  @CityDecorator(CityEnum.LVIV)
  @UseGuards(AuthGuard(), CityGuard)
  @Get()
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    const result = await this.userService.getAllUsers(query);
    return UserResponseMapper.toListDto(result, query);
  }

  @ApiOperation({ summary: 'Create new user' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  async createUser(
    @Body() body: UserCreateRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserDetailsResponseDto> {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }
    const result = await this.userService.createUser(body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @UseGuards(AuthGuard())
  @Get(':userId')
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.getUserById(userId);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const result = await this.userService.updateUser(userId, body);
    return UserResponseMapper.toDetailsDto(result);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }

  @Post('login')
  async loginUser(@Body() body: UserLoginDto) {
    return await this.userService.login(body);
  }

  @Post('logout')
  @UseGuards(AuthGuard(), LogoutGuard)
  async logoutUser() {
    return 'Exit user from API :)';
  }

  @Post('social')
  async loginUserByGoogle(@Body() body: UserLoginGoogleDto) {
    return await this.userService.loginSocial(body);
  }
}
