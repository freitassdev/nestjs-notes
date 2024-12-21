import { UserContract } from "@/modules/user/contracts/user.contract";
import { UserEntity } from "@/modules/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { UserMapper } from "../mappers/user.mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository implements UserContract {
    constructor(private prisma: PrismaService) { }

    async create(user: UserEntity): Promise<void> {
        const userRaw = UserMapper.toPrisma(user);
        await this.prisma.user.create({
            data: userRaw
        })
    }
}