import { IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "@/infra/http/classValidator/decorators/isNotEmptyCustom";
import { IsStringCustom } from "@/infra/http/classValidator/decorators/isStringCustom";
export class EditNoteDTO {
    @IsNotEmptyCustom()
    @IsStringCustom()
    title: string;

    @IsStringCustom()
    @IsOptional()
    description?: string;
}