import { NoteEntity } from "@/modules/note/entities/note.entity";
import { Note as NoteRaw } from "@prisma/client";
export class NoteMapper {
    static toPrisma({ createdAt, description, id, title, userId }: NoteEntity): NoteRaw {
        return {
            createdAt,
            description,
            id,
            title,
            userId
        };
    }

    static toEntity({ title, description, createdAt, id, userId }: NoteRaw): NoteEntity {
        return new NoteEntity({
            createdAt,
            description,
            title,
            userId
        }, id);
    }
}