import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNoteDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}