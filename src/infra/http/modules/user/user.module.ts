import { DatabaseModule } from "@/infra/database/database.module";
import { CreateUserUseCase } from "@/modules/user/useCases/createUser/createUser.useCase";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

@Module({
    imports: [DatabaseModule],
    providers: [CreateUserUseCase],
    controllers: [UserController],
})
export class UserModule {}