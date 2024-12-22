import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";

interface IGetNoteRequest {
    noteId: string,
    userId: string
}

@Injectable()
export class GetNoteUseCase {
    constructor(private readonly noteContract: NoteContract) { }
    async run({ noteId, userId }: IGetNoteRequest) {
        const note = await this.noteContract.findById(noteId);

        if (!note) throw new NotFoundException('Note not found');
        if (note.userId !== userId) throw new UnauthorizedException()

        return note;
    }
}