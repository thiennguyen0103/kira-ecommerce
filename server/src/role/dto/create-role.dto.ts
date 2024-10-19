import { IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from 'src/utils/enums/roles.enum';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: RoleEnum;
}
