import { CreateUserUseCase } from "@/modules/user/useCases/createUser/createUser.useCase";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserViewModel } from "./viewModel/userViewModel";

@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const { email, name, password } = createUserDTO;
        const createdUser = await this.createUserUseCase.run({ email, name, password });
        return UserViewModel.toHttp(createdUser);
    }
}