import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ClockInDto {
  @Transform(({ value }) => Number(value))
  time: number;

  @IsInt()
  @Transform(({ value }) => Number(value))
  userId: number;
}
