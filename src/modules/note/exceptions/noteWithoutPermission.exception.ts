import { AppException } from "@/exceptions/app.exception";
import { HttpStatus } from "@nestjs/common";

interface INotePermissionExceptionProps {
    actionName: string
}

export class NoteWithoutPermissionException extends AppException {
    constructor({ actionName }: INotePermissionExceptionProps) {
        super({
            message: `Without permission to ${actionName} this note`,
            status: HttpStatus.UNAUTHORIZED
        })
    }
}