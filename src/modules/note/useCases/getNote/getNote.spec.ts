import { GetNoteUseCase } from "./getNote.useCase";
import { NoteContractMock } from "../../contracts/mocks/note-contract.mock";
import { makeUser } from "@/modules/user/factories/user.factory";
import { makeNote } from "../../factories/note.factory"; 
import { NoteWithoutPermissionException } from "../../exceptions/noteWithoutPermission.exception";
import { NotFoundNoteException } from "../../exceptions/notFoundNote.exception";

let noteContractMock: NoteContractMock;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note', () => {
    beforeEach(() => {
        noteContractMock = new NoteContractMock();
        getNoteUseCase = new GetNoteUseCase(noteContractMock);
    });

    it('Should get a note', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: user.id,
        })

        noteContractMock.notes = [note];

        const result = await getNoteUseCase.run({
            noteId: note.id,
            userId: user.id
        });

        expect(result).toEqual(note);
    })

    it('Should not get a note if note not found', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: user.id,
            id: 'note-id'
        })
        noteContractMock.notes = [note];

        expect(async () => {
            await getNoteUseCase.run({
                noteId: 'otherId',
                userId: user.id
            });
        }).rejects.toThrow(NotFoundNoteException);
    })

    it('Should not get a note if user is not the owner', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: 'another-user'
        })

        noteContractMock.notes = [note];
        expect(async () => {
            await getNoteUseCase.run({
                noteId: note.id,
                userId: user.id
            });
        }).rejects.toThrow(NoteWithoutPermissionException);
    })
});