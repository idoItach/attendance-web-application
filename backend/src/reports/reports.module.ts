import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './Report.entity';
import { User } from 'src/users/User.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report, User]), UsersModule],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
