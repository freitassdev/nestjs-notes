import { IsNotEmptyCustom } from "@/infra/http/classValidator/decorators/isNotEmptyCustom";
import { IsOptional } from "class-validator";
import { IsStringCustom } from "@/infra/http/classValidator/decorators/isStringCustom";
export class CreateNoteDTO {
    @IsNotEmptyCustom()
    @IsStringCustom()
    title: string;

    @IsStringCustom()
    @IsOptional()
    description?: string;
}