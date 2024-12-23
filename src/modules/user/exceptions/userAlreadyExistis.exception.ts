import { AppException } from "@/exceptions/app.exception";
import { HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends AppException {
    constructor() {
        super({
            message: 'User already exists',
            status: HttpStatus.CONFLICT
        })
    }
}