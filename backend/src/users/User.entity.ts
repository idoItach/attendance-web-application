import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/reports/Report.entity';
import { UserRoles } from 'src/commons/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Employee })
  role: UserRoles;

  @ManyToOne(() => User, (user) => user.managedUsers, { nullable: true })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  managedUsers: User[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
