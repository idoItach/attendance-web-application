import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ClockOutDto {
  @Transform(({ value }) => Number(value))
  time: number;

  @IsInt()
  @Transform(({ value }) => Number(value))
  userId: number;
}
