import { IsString, IsEmail } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
