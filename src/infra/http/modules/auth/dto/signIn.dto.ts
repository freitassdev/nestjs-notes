import { IsNotEmptyCustom } from "@/infra/http/classValidator/decorators/isNotEmptyCustom";
import { IsStringCustom } from "@/infra/http/classValidator/decorators/isStringCustom";
import { IsEmailCustom } from "@/infra/http/classValidator/decorators/isEmailCustom";
import { MinLengthCustom } from "@/infra/http/classValidator/decorators/minLengthCustom";

export class SignInDTO {

    @IsStringCustom()
    @IsNotEmptyCustom()
    @IsEmailCustom()
    email: string

    @IsStringCustom()
    @IsNotEmptyCustom()
    @MinLengthCustom(6)
    password: string
}