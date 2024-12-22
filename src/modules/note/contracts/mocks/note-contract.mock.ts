import { NoteEntity } from "../../entities/note.entity";
import { NoteContract } from "../note.contract";

export class NoteContractMock implements NoteContract {
    public notes: NoteEntity[] = [];

    async create(note: NoteEntity): Promise<void> {
        this.notes.push(note);
    }

    async findById(id: string): Promise<NoteEntity | null> {
        return this.notes.find((note) => note.id === id) || null;
    }

    async delete(id: string): Promise<void> {
        this.notes = this.notes.filter((note) => note.id !== id);
    }

    async save(note: NoteEntity): Promise<void> {
        this.notes = this.notes.map((n) => n.id === note.id ? note : n);
    }

    async findManyByUserId(userId: string, currentPage: number, perPage: number): Promise<NoteEntity[]> {
        return this.notes
            .filter((note) => note.userId === userId)
            .slice((currentPage - 1) * perPage, currentPage * perPage);
    }
}