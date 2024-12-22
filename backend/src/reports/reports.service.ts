import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './Report.entity';
import { Repository } from 'typeorm';
import { ClockInDto } from './dto/clockIn.dto';
import { UsersService } from 'src/users/users.service';
import { ClockOutDto } from './dto/clockOut.dto';
import { ReportStatus } from 'src/commons/enums';
import { UpdateStatusDto } from './dto/updateStatus.dto';
import { User } from 'src/users/User.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
    private readonly usersService: UsersService,
  ) {}

  findOne(reportId: number): Promise<Report> {
    return this.reportsRepository.findOne({
      where: { id: reportId },
    });
  }

  async createClockIn(clockInDto: ClockInDto): Promise<Report> {
    console.log(clockInDto);
    const user = await this.usersService.findOne(clockInDto.userId);
    if (!user) {
      throw new NotFoundException(
        `Employee with ID ${clockInDto.userId} not found`,
      );
    }
    if (this.findReportInProgress(user) !== undefined) {
      throw new BadRequestException(
        `There is a report in progress for user with ID ${clockInDto.userId}. Please first clock-out`,
      );
    }
    const dateObject = new Date(clockInDto.time);
    const date = dateObject.toISOString().split('T')[0];

    const report = this.reportsRepository.create({
      date,
      startTime: dateObject,
      user,
    });
    return this.reportsRepository.save(report);
  }

  async createClockOut(clockOutDto: ClockOutDto): Promise<Report> {
    const user = await this.usersService.findOne(clockOutDto.userId);
    if (!user) {
      throw new NotFoundException(
        `Employee with ID ${clockOutDto.userId} not found`,
      );
    }
    const report = this.findReportInProgress(user);
    if (!report) {
      throw new NotFoundException(
        `Can't find a report in progress for user with ID ${clockOutDto.userId}. Please first clock-in`,
      );
    }
    const dateObject = new Date(clockOutDto.time);
    return this.reportsRepository.save({
      ...report,
      endTime: dateObject,
      status: ReportStatus.Pending,
    });
  }

  async updateStatus(updateStatusDto: UpdateStatusDto): Promise<Report> {
    const report = await this.findOne(updateStatusDto.reportId);
    if (!report) {
      throw new NotFoundException(
        `Report with ID ${updateStatusDto.reportId} not found`,
      );
    }
    return this.reportsRepository.save({
      ...report,
      status: updateStatusDto.status,
    });
  }

  findReportInProgress(user: User): Report {
    return user.reports.find(
      (report) => report.status === ReportStatus.InProgress,
    );
  }
}
