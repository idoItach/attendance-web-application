import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ReportStatus } from 'src/commons/enums';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  startTime: number;

  @Column()
  endTime: number;

  @Column({ default: ReportStatus.Pending })
  status: ReportStatus.Pending | ReportStatus.Approved | ReportStatus.Rejected;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
