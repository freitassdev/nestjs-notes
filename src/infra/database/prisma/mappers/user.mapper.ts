import { UserEntity } from "@/modules/user/entities/user.entity";
import { User as UserRaw } from "@prisma/client";
export class UserMapper {
    static toPrisma({ createdAt, email, name, password, id, updatedAt }: UserEntity): UserRaw {
        return {
          createdAt,
          email,
          name,
          password,
          id,
          updatedAt,
        };
      }
}