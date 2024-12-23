import { Injectable } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";
import { NotFoundNoteException } from "../../exceptions/notFoundNote.exception";
import { NoteWithoutPermissionException } from "../../exceptions/noteWithoutPermission.exception";

interface IDeleteNoteRequest {
    noteId: string;
    userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
    constructor(private readonly noteContract: NoteContract) { }

    async run({ noteId, userId }: IDeleteNoteRequest) {
        const note = await this.noteContract.findById(noteId);

        if (!note) throw new NotFoundNoteException();
        if (note.userId !== userId) throw new NoteWithoutPermissionException({ actionName: 'delete' });

        await this.noteContract.delete(noteId);
    }
}