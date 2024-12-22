import { GetManyUseCase } from "./getMany.useCase";
import { NoteContractMock } from "../../contracts/mocks/note-contract.mock";
import { makeUser } from "@/modules/user/factories/user.factory";
import { makeNote } from "../../factories/note.factory";
import { NoteEntity } from "../../entities/note.entity";

let noteContractMock: NoteContractMock;
let getManyNoteUseCase: GetManyUseCase;

describe('GetManyNotes', () => {
    beforeEach(() => {
        noteContractMock = new NoteContractMock();
        getManyNoteUseCase = new GetManyUseCase(noteContractMock);
    });

    it('Should able to get many notes', async () => {
        const user = makeUser({ id: '123' })

        const notes = Array.from({ length: 10 }).map(() => makeNote({
            userId: user.id,
        }))

        noteContractMock.notes = notes;

        const result = await getManyNoteUseCase.run({ userId: user.id })

        expect(result).toEqual(notes);
    })

    it('Should be able to get only user notes', async () => {
        const user1 = makeUser({ id: '123' })
        const user2 = makeUser({ id: '456' })
        const notes = Array.from({ length: 10 }).map((_, index) => makeNote({
            userId: index < 5 ? user1.id : user2.id,
        }))

        noteContractMock.notes = notes;

        const result = await getManyNoteUseCase.run({ userId: user1.id })
        expect(result).toHaveLength(5);
    })

    it('Should be able to control notes per page', async () => {
        const user = makeUser({ id: '123' })

        const notes = Array.from({ length: 10 }).map(() => makeNote({
            userId: user.id,
        }))

        noteContractMock.notes = notes;

        const result = await getManyNoteUseCase.run({ userId: user.id, perPage: "7" })

        expect(result).toHaveLength(7);
    })

    it('Should be able to control page', async () => {
        const user = makeUser({ id: '123' })

        const notes = Array.from({ length: 10 }).map((_, index) => makeNote({
            userId: user.id,
            title: index < 5 ? "page 1" : "page 2"
        }))

        noteContractMock.notes = notes; 
        
        let result: NoteEntity[];
        result = await getManyNoteUseCase.run({ userId: user.id, perPage: "5", page: "1" })
        expect(result[0].title).toEqual("page 1");

        result = await getManyNoteUseCase.run({ userId: user.id, perPage: "5", page: "2" })
        expect(result[0].title).toEqual("page 2");

    })
});