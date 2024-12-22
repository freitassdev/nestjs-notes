import { UserEntity } from "@user/entities/user.entity";
import { Request } from "express";

export class AuthRequestModel extends Request {
    user: UserEntity
}