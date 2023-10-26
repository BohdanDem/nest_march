import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserCreateProfileDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsersList() {
    return await this.userRepository.find();
  }

  async createUser(userData: UserCreateProfileDto) {
    const userEmail = userData.email.trim();
    const findUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    try {
      const newUser = this.userRepository.create(userData);
      if (!userData.city) {
        newUser.city = 'Odessa';
      }
      return await this.userRepository.save(newUser);
    } catch (err) {
      throw new HttpException('Create user failed', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUserAccount(id: string) {
    return await this.userRepository.delete(`${id}`);
  }

  async updateUser(user: Partial<UserCreateProfileDto>, id: string) {
    //console.log(user, id);
    try {
      return await this.userRepository.update(id, user);
    } catch (err) {
      throw new HttpException('Update user failed', HttpStatus.BAD_REQUEST);
    }
  }
}
