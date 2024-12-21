import { Module } from "@nestjs/common";
import { UserContract } from "@/modules/user/contracts/user.contract";
import { UserRepository } from "./prisma/repositories/user.repository";
import { PrismaService } from "./prisma/prisma.service";
@Module({
    providers: [PrismaService, {
        provide: UserContract,
        useClass: UserRepository
    }],
    exports: [UserContract],
})
export class DatabaseModule { }