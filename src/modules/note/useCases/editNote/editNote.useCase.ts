import { Injectable } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";
import { NoteEntity } from "../../entities/note.entity";
import { NoteWithoutPermissionException } from "../../exceptions/noteWithoutPermission.exception";
import { NotFoundNoteException } from "../../exceptions/notFoundNote.exception";

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

        if (!note) throw new NotFoundNoteException();
        if (note.userId !== userId) throw new NoteWithoutPermissionException({ actionName: 'edit' });

        note.title = title;
        note.description = description || null;

        await this.noteContract.save(note);
        return note;
    }
}