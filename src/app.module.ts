import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomConfigModule } from './config/config.module';
import { typeOrmConfig } from './config/type-orm.config';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarModule } from './modules/car/car.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
    AddressModule,
    UserModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
