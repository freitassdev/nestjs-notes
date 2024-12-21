import { UserEntity } from "@/modules/user/entities/user.entity";
export class UserViewModel {
  static toHttp({ createdAt, email, id, name, updatedAt}: UserEntity) {
    return {
      id,
      email,
      name,
      createdAt,
      updatedAt,
    };
  }
}