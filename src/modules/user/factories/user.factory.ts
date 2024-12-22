import { UserEntity } from "@user/entities/user.entity";

type Override = Partial<UserEntity>;

export const makeUser = ({ id, ...user }: Override): UserEntity => {
    return new UserEntity({
        name: "fake name",
        email: "fake email",
        password: "fake password",
        ...user,
    }, id);
}