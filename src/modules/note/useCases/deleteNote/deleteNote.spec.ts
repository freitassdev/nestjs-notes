import { DeleteNoteUseCase } from "./deleteNote.useCase";
import { NoteContractMock } from "../../contracts/mocks/note-contract.mock";
import { makeUser } from "@/modules/user/factories/user.factory";
import { makeNote } from "../../factories/note.factory";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

let noteContractMock: NoteContractMock;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note', () => {
    beforeEach(() => {
        noteContractMock = new NoteContractMock();
        deleteNoteUseCase = new DeleteNoteUseCase(noteContractMock);
    });

    it('Should delete a note', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: user.id,
        })

        noteContractMock.notes = [note];

        await deleteNoteUseCase.run({
            noteId: note.id,
            userId: user.id
        });

        expect(noteContractMock.notes).toHaveLength(0);
    })

    it('Should not delete a note if note not found', async () => {
        const user = makeUser({ id: '123' })
        noteContractMock.notes = [];

        expect(async () => {
            await deleteNoteUseCase.run({
                noteId: '123',
                userId: user.id
            });
        }).rejects.toThrow(NotFoundException);
    })

    it('Should not delete a note if user is not the owner', async () => {
        const user = makeUser({ id: '123' })
        const note = makeNote({
            userId: 'another-user'
        })

        noteContractMock.notes = [note];
        expect(async () => {
            await deleteNoteUseCase.run({
                noteId: note.id,
                userId: user.id
            });
        }).rejects.toThrow(UnauthorizedException);
    })
});