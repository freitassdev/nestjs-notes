import { Injectable } from "@nestjs/common";
import { UserContract } from "@user/contracts/user.contract";
import { compare } from "bcrypt";
import { AuthValueIncorrectException } from "../../exceptions/authValueIncorrect.exception";

interface ValidateUserRequest {
    email: string;
    password: string;
}

@Injectable()
export class ValidateUserUseCase {
    constructor(private readonly userContract: UserContract) { }

    async run({ email, password }: ValidateUserRequest) {
        const user = await this.userContract.findByEmail(email);
        
        if(user) {
            const isPasswordMatch = await compare(password, user.password);
            if(isPasswordMatch) {
                return user;
            }
        }

        throw new AuthValueIncorrectException();
    }   
}