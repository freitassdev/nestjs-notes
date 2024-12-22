import { NoteContract } from "@/modules/note/contracts/note.contract";
import { PrismaService } from "../prisma.service";
import { NoteEntity } from "@/modules/note/entities/note.entity";
import { NoteMapper } from "../mappers/note.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NoteRepository implements NoteContract {
    constructor(private readonly prisma: PrismaService) { }
    async create(note: NoteEntity): Promise<void> {
        const noteRaw = NoteMapper.toPrisma(note);
        await this.prisma.note.create({ data: noteRaw });
    }

    async findById(id: string): Promise<NoteEntity | null> {
        const noteRaw = await this.prisma.note.findUnique({ where: { id } });
        if(!noteRaw) return null;

        return NoteMapper.toEntity(noteRaw);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.note.delete({ where: { id } });
    }

    async save(note: NoteEntity): Promise<void> {
        const { id, ...noteRaw } = NoteMapper.toPrisma(note);
        await this.prisma.note.update({ where: { id }, data: noteRaw });
    }

    async findManyByUserId(userId: string, currentPage: number, perPage: number): Promise<NoteEntity[]> {
        const notes = await this.prisma.note.findMany({
            where: { userId },
            take: perPage,
            skip: (currentPage - 1) * perPage,
        });

        return notes.map(NoteMapper.toEntity);
    }
}