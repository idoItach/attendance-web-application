import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './Report.entity';
import { User } from 'src/users/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, User])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
