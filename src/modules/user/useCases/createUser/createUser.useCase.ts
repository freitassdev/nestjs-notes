import { Injectable } from "@nestjs/common";
import { UserContract } from "../../contracts/user.contract";
import { UserEntity } from "../../entities/user.entity";
import { hash } from "bcrypt";
import { UserAlreadyExistsException } from "../../exceptions/userAlreadyExistis.exception";

interface CreateUserRequest {
    email: string;
    name: string;
    password: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(private userContract: UserContract) { }
    async run({ name, email, password }: CreateUserRequest): Promise<UserEntity> {
        const userAlreadyExists = await this.userContract.findByEmail(email);
        if(userAlreadyExists) throw new UserAlreadyExistsException();
        
        const userRaw = new UserEntity({
            name,
            email,
            password: await hash(password, 10)
        });

        await this.userContract.create(userRaw);

        return userRaw;
    }
}