import { Transform } from 'class-transformer';
import { IsEnum, IsInt } from 'class-validator';
import { ReportStatus } from 'src/commons/enums';

export class UpdateStatusDto {
  @IsEnum(ReportStatus, {
    message: "Status must be one of 'Approved' or 'Rejected'",
  })
  status: ReportStatus;

  @IsInt()
  @Transform(({ value }) => Number(value))
  reportId: number;
}
