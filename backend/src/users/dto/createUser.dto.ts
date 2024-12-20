import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { UserRoles } from 'src/commons/enums';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsEnum(UserRoles, { message: "Role must be one of 'Manager' or 'Employee'" })
  role: UserRoles;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  managerId?: number;
}
