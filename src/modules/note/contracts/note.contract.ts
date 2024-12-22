import { Injectable } from "@nestjs/common";
import { NoteEntity } from "../entities/note.entity";

@Injectable()
export abstract class NoteContract {
    abstract create(note: NoteEntity): Promise<void>;
    abstract findById(id: string): Promise<NoteEntity | null>;
    abstract delete(id: string): Promise<void>;
    abstract save(note: NoteEntity): Promise<void>;
    abstract findManyByUserId(userId: string, currentPage: number, perPage: number): Promise<NoteEntity[]>;
}