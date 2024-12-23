import { AppException } from "@/exceptions/app.exception";
import { HttpStatus } from "@nestjs/common";

export class NotFoundNoteException extends AppException {
    constructor() {
        super({
            message: 'Note not found',
            status: HttpStatus.NOT_FOUND
        })
    }
}