import { HttpStatus } from "@nestjs/common";
import { AppException, IAppExceptionProps } from "./app.exception";

interface IIncorrectValuesExceptionProps {
    fields: IAppExceptionProps["fields"]
}

export class IncorrectValuesException extends AppException {
    constructor({ fields }: IIncorrectValuesExceptionProps) {
        super({
            message: "Dados Inválidos",
            status: HttpStatus.BAD_REQUEST,
            fields: fields
        })
    }
}