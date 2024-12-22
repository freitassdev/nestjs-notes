import { Injectable } from "@nestjs/common";
import { NoteContract } from "../../contracts/note.contract";
import { NoteEntity } from "../../entities/note.entity";

interface IGetManyRequest {
    userId: string
    page?: string
    perPage?: string
}

@Injectable()
export class GetManyUseCase {
    constructor(private readonly noteContract: NoteContract) { }
    async run({ page, perPage, userId }: IGetManyRequest): Promise<NoteEntity[]> {
        const defautPage = 1;
        const defaultPerPage = 20;

        const currentPage = Number(page) || defautPage;
        const notesPerPage = Number(perPage) || defaultPerPage;

        const notes = await this.noteContract.findManyByUserId(
            userId,
            currentPage,
            notesPerPage
        )

        return notes;
    }
}