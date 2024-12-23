import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { SignInDTO } from "../dto/signIn.dto";
import { validate } from "class-validator";
import { IncorrectValuesException } from "@/exceptions/incorrectValues.exception";
import { mapperClassValidationErrorToAppException } from "@/utils/mappers";
export class SignInDTOValidateMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;
        const signInDTO = new SignInDTO();
        signInDTO.email = body.email;
        signInDTO.password = body.password;

        const validations = await validate(signInDTO);

        if (validations.length > 0) {
            throw new IncorrectValuesException({
                fields: mapperClassValidationErrorToAppException(validations)
            })
        }
        next()
    }
}