import { NoteEntity } from "../entities/note.entity";
type Override = Partial<NoteEntity>;

export const makeNote = ({ id, ...notes }: Override): NoteEntity => {
    return new NoteEntity({
        title: "fake title",
        description: "fake description",
        userId: "fake user id",
        ...notes,
    }, id);
}