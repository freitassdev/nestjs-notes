import { NoteEntity } from "@/modules/note/entities/note.entity";

export class NoteViewModel {
    static toHttp({ createdAt, description, id, title }: NoteEntity) {
        return {
            id,
            title,
            description,
            createdAt,
        };
    }
}   