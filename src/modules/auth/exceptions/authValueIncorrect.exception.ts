import { AppException } from "@/exceptions/app.exception";
import { HttpStatus } from "@nestjs/common";

export class AuthValueIncorrectException extends AppException {
    constructor() {
        super({
            message: 'Email ou senha incorretos.',
            status: HttpStatus.UNAUTHORIZED
        })
    }
}