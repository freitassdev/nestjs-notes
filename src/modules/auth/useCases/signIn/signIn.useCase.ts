import { UserEntity } from "@/modules/user/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { IUserPayload } from "../../models/userPayload.model";
import { JwtService } from "@nestjs/jwt";
interface ISignInRequest {
    user: UserEntity
}

@Injectable()
export class SignInUseCase {
    constructor (private readonly jwtService: JwtService) {}
    async run({ user }: ISignInRequest): Promise<string> {
        const payload: IUserPayload = {
            createdAt: user.createdAt.toJSON(),
            email: user.email,
            name: user.name,
            sub: user.id
        }

        const jwtToken = this.jwtService.sign(payload);
        return jwtToken
    }
}