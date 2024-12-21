import { Replace } from '@/utils/replace';
import { randomUUID } from 'crypto';

export interface IUserSchema {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserEntity {
    private props: IUserSchema;
    private _id: string;

    constructor(props: Replace<IUserSchema, { createdAt?: Date, updatedAt?: Date }>, id?: string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        };
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id;
    }

    get email(): string {
        return this.props.email;
    }

    set email(email: string) {
        this.props.email = email;
    }

    get password(): string {
        return this.props.password;
    }

    set password(password: string) {
        this.props.password = password;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }
}