import { UserEntity } from '../../entities/user.entity';
import { UserContract } from '../user.contract';

export class UserContractMock implements UserContract {
    public users: UserEntity[] = []
    async create(user: UserEntity): Promise<void> {
        this.users.push(user)
    }
    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.users.find(user => user.email === email) || null
    }
}