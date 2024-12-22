import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { ValidateUserUseCase } from "@/modules/auth/useCases/validateUser/validateUser.useCase";
import { DatabaseModule } from "@/infra/database/database.module";
import { LocalStrategy } from "@/modules/auth/strategies/local.strategy";
import { UserModule } from "../user/user.module";
import { SignInDTOValidateMiddleware } from "./middleware/signInDTOValidate.middleware";
import { SignInUseCase } from "@/modules/auth/useCases/signIn/signIn.useCase";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";

@Module({
    controllers: [AuthController],
    providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
    imports: [
        DatabaseModule,
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
        })
    ]
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInDTOValidateMiddleware).forRoutes('auth/signIn');
    }
}