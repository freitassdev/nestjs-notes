import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";
import { NoteEntity } from "../../entities/note.entity";

interface EditNoteRequest {
    noteId: string;
    userId: string;
    title: string;
    description?: string | null;
}

@Injectable()
export class EditNoteUseCase {
    constructor(private readonly noteContract: NoteContract) { }
    async run({ noteId, userId, title, description }: EditNoteRequest): Promise<NoteEntity> {
        const note = await this.noteContract.findById(noteId);

        if (!note) throw new NotFoundException('Note not found');
        if(note.userId !== userId) throw new UnauthorizedException();

        note.title = title;
        note.description = description || null;
        
        await this.noteContract.save(note);
        return note;
    }
}