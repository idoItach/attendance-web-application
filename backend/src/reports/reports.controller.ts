import { Body, Controller, Post, Put } from '@nestjs/common';
import { ClockInDto } from './dto/clockIn.dto';
import { ReportsService } from './reports.service';
import { Report } from './Report.entity';
import { ClockOutDto } from './dto/clockOut.dto';
import { UpdateStatusDto } from './dto/updateStatus.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('/clock-in')
  async createClockIn(@Body() clockInDto: ClockInDto): Promise<Report> {
    return this.reportsService.createClockIn(clockInDto);
  }

  @Post('/clock-out')
  async createClockOut(@Body() clockOutDto: ClockOutDto): Promise<Report> {
    return this.reportsService.createClockOut(clockOutDto);
  }

  @Put('/status')
  updateStatus(@Body() updateStatusDto: UpdateStatusDto): Promise<Report> {
    return this.reportsService.updateStatus(updateStatusDto);
  }
}
