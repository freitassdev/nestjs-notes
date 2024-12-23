import { HttpStatus } from "@nestjs/common";
import { AppException } from "./app.exception";

export class InvalidJwtTokenException extends AppException {
    constructor() {
        super({
            message: "Token de acesso inválido ou expirado",
            status: HttpStatus.UNAUTHORIZED
        })
    }
}