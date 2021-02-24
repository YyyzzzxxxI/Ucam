import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Somethings } from './entities/somethings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Somethings])],
})
export class SomethingsModule {}
