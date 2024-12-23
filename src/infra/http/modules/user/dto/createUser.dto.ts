import { IsNotEmptyCustom } from '@/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsEmailCustom } from '@/infra/http/classValidator/decorators/isEmailCustom';
import { IsStringCustom } from '@/infra/http/classValidator/decorators/isStringCustom';
import { MinLengthCustom } from '@/infra/http/classValidator/decorators/minLengthCustom';

export class CreateUserDTO {
  @IsStringCustom()
  @IsEmailCustom()
  @IsNotEmptyCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}