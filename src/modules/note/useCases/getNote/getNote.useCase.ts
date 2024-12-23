import { Injectable } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";
import { NoteWithoutPermissionException } from "../../exceptions/noteWithoutPermission.exception";
import { NotFoundNoteException } from "../../exceptions/notFoundNote.exception";

interface IGetNoteRequest {
    noteId: string,
    userId: string
}

@Injectable()
export class GetNoteUseCase {
    constructor(private readonly noteContract: NoteContract) { }
    async run({ noteId, userId }: IGetNoteRequest) {
        const note = await this.noteContract.findById(noteId);

        if (!note) throw new NotFoundNoteException();
        if (note.userId !== userId) throw new NoteWithoutPermissionException({ actionName: 'get' });

        return note;
    }
}