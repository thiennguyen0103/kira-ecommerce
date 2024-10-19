import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
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
}
