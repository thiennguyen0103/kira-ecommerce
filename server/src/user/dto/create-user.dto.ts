import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@example.com',
    type: String,
  })
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ type: String })
  @IsUUID()
  roleId: string;
}
