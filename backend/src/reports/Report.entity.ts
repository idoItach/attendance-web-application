import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/User.entity';
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

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.Pending })
  status: ReportStatus;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
