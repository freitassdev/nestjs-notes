import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EditNoteDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}