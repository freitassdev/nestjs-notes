import { NoteContractMock } from "../../contracts/mocks/note-contract.mock";
import { CreateNoteUseCase } from "./createNote.useCase";

let noteContractMock: NoteContractMock;
let createNoteUseCase: CreateNoteUseCase;
describe('Create Note', () => {
    beforeEach(() => {
        noteContractMock = new NoteContractMock();
        createNoteUseCase = new CreateNoteUseCase(noteContractMock);
    })

    it('should create a note', async () => {
        const note = await createNoteUseCase.run({
            title: 'Note Title',
            description: 'Note Description',
            userId: 'user-id'
        })

        expect(noteContractMock.notes[0]).toEqual(note);
    });
});