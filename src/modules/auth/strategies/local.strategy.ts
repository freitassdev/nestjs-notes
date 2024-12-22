
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserUseCase } from '../useCases/validateUser/validateUser.useCase';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly validateUserUseCase: ValidateUserUseCase) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string): Promise<any> {
        return await this.validateUserUseCase.run({ email, password });
    }
}
