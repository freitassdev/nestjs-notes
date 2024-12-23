import { EditNoteUseCase } from "./editNote.useCase";
import { NoteContractMock } from "../../contracts/mocks/note-contract.mock";
import { makeUser } from "@/modules/user/factories/user.factory";
import { makeNote } from "../../factories/note.factory";
import { NoteWithoutPermissionException } from "../../exceptions/noteWithoutPermission.exception";
import { NotFoundNoteException } from "../../exceptions/notFoundNote.exception";

let noteContractMock: NoteContractMock;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
    beforeEach(() => {
        noteContractMock = new NoteContractMock();
        editNoteUseCase = new EditNoteUseCase(noteContractMock);
    });

    it('Should edit a note', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: user.id,
            title: 'old title',
            description: 'old description'
        })

        noteContractMock.notes = [note];
        note.title = 'new title';
        note.description = 'new description';

        await editNoteUseCase.run({
            noteId: note.id,
            userId: user.id,
            title: note.title,
            description: note.description
        })

        expect(noteContractMock.notes).toEqual([note]);
    })

    it('Should not edit a note if note not found', async () => {
        const user = makeUser({ id: '123' })
        noteContractMock.notes = [];

        expect(async () => {
            await editNoteUseCase.run({
                noteId: '123',
                userId: user.id,
                title: 'new title',
                description: 'new description'
            });
        }).rejects.toThrow(NotFoundNoteException);
    })

    it('Should not edit a note if user is not the owner', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: 'another-user'
        })

        noteContractMock.notes = [note];
        expect(async () => {
            await editNoteUseCase.run({
                noteId: note.id,
                userId: user.id,
                title: 'new title',
                description: 'new description'
            });
        }).rejects.toThrow(NoteWithoutPermissionException);
    })
});