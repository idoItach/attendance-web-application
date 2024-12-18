import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Report } from './report.entity';
import { UserRoles } from 'src/commons/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: UserRoles.Manager | UserRoles.Employee;

  @ManyToOne(() => User, (user) => user.managedUsers, { nullable: true })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  managedUsers: User[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
