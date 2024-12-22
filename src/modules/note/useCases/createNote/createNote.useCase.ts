import { Injectable } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";
import { NoteEntity } from "../../entities/note.entity";

interface ICreateNoteRequest {
    title: string;
    description?: string;
    userId: string;
}

@Injectable()
export class CreateNoteUseCase {
    constructor(private readonly noteContract: NoteContract) { }

    async run({ title, description, userId }: ICreateNoteRequest) {
        const note = new NoteEntity({ title, description, userId });
        await this.noteContract.create(note);
        return note;

    }
}