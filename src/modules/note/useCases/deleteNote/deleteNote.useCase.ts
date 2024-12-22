import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";

interface IDeleteNoteRequest {
    noteId: string;
    userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
    constructor(private readonly noteContract: NoteContract) { }

    async run({ noteId, userId }: IDeleteNoteRequest) {
        const note = await this.noteContract.findById(noteId);

        if (!note) throw new NotFoundException('Note not found');
        if(note.userId !== userId) throw new UnauthorizedException()

        await this.noteContract.delete(noteId);
    }
}