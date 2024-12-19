import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './Report.entity';
import { Repository } from 'typeorm';
import { ClockInDto } from './dto/clockIn.dto';
import { UsersService } from 'src/users/users.service';
import { ClockOutDto } from './dto/clockOut.dto';
import { ReportStatus } from 'src/commons/enums';
import { UpdateStatusDto } from './dto/updateStatus.dto';

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
    const user = await this.findOne(clockInDto.userId);
    if (!user) {
      throw new NotFoundException(
        `Employee with ID ${clockInDto.userId} not found`,
      );
    }
    const dateObject = new Date(clockInDto.startTime);
    const date = dateObject.toISOString().split('T')[0];

    const report = this.reportsRepository.create({
      date,
      startTime: dateObject,
      user,
    });
    return this.reportsRepository.save(report);
  }

  async updateClockOut(clockOutDto: ClockOutDto): Promise<Report> {
    const report = await this.findOne(clockOutDto.reportId);
    if (!report) {
      throw new NotFoundException(
        `Report with ID ${clockOutDto.reportId} not found`,
      );
    }
    const dateObject = new Date(clockOutDto.endTime);
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
}
