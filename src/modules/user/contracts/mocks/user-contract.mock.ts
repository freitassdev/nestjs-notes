import { UserEntity } from '../../entities/user.entity';
import { UserContract } from '../user.contract';

export class UserContractMock implements UserContract {
    public users: UserEntity[] = []
    async create(user: UserEntity): Promise<void> {
        this.users.push(user)
    }
}