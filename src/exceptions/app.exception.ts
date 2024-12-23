import { HttpException, HttpStatus } from "@nestjs/common";

export interface IAppExceptionProps {
    message: string;
    status: HttpStatus;
    fields?: {
        [key: string]: string
    }
}

export class AppException extends HttpException {
    constructor({ message, status, fields }: IAppExceptionProps) {
        super({
            message,
            fields
        }, status)
    }
}