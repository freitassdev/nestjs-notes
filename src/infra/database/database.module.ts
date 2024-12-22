import { Module } from "@nestjs/common";
import { UserContract } from "@/modules/user/contracts/user.contract";
import { UserRepository } from "./prisma/repositories/user.repository";
import { PrismaService } from "./prisma/prisma.service";
import { NoteContract } from "@/modules/note/contracts/note.contract";
import { NoteRepository } from "./prisma/repositories/note.repository";
@Module({
    providers: [
        PrismaService,
        {
            provide: UserContract,
            useClass: UserRepository
        },
        {
            provide: NoteContract,
            useClass: NoteRepository
        }
    ],
    exports: [UserContract, NoteContract],
})
export class DatabaseModule { }