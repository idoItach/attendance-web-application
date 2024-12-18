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

  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;

  @ManyToOne(() => User, (user) => user.managedUsers, { nullable: true })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  managedUsers: User[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
