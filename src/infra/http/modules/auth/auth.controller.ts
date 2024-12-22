import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthRequestModel } from "./models/authRequest.model";
import { SignInUseCase } from "@/modules/auth/useCases/signIn/signIn.useCase";
import { LocalAuthGuard } from "./guards/localAuth.guard";
import { JwtAuthGuard } from "./guards/jwtAuth.guard";
import { Public } from "./decorators/isPublic";
import { AuthenticatedRequestModel } from "./models/authenticatedRequest.model";

@Controller('auth')
export class AuthController {
    constructor(private readonly signInUseCase: SignInUseCase) {}
    
    @Post('signIn')
    @HttpCode(HttpStatus.OK)
    @Public()
    @UseGuards(LocalAuthGuard)
    async signIn(@Request() req: AuthRequestModel) {
        const token = await this.signInUseCase.run({ user: req.user });
        return { token };
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    async test(@Request() request: AuthenticatedRequestModel) {
        return request.user
    }
}