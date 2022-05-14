/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Flight } from './flight/entity/flight.entity';
import { FlightModule } from './flight/flight.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:'./db/flightfinal.db',
      entities: [User,Flight],
      synchronize: true
    }),
    FlightModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
