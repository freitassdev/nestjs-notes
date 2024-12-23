import { CreateUserUseCase } from "./createUser.useCase";
import { UserContractMock } from "../../contracts/mocks/user-contract.mock";
import { makeUser } from "../../factories/user.factory";
import { compare } from "bcrypt";
import { UserAlreadyExistsException } from "../../exceptions/userAlreadyExistis.exception";
let userContractMock = new UserContractMock()
let userUseCase = new CreateUserUseCase(userContractMock)

describe('CreateUserUseCase', () => {
    beforeEach(() => {
        userContractMock = new UserContractMock()
        userUseCase = new CreateUserUseCase(userContractMock)
    })

    it('Should create a new user', async () => {
        const user = await userUseCase.run({
            email: 'fakemail@gmail.com',
            name: 'fake name',
            password: 'fake password'
        });

        expect(userContractMock.users[0]).toEqual(user);
    })

    it('Should be able to create user with encrypted password', async () => {
        const originalPassword = 'pass-without-encryption';

        const user = await userUseCase.run({
            email: "fakemail@email.com",
            name: "fake user name",
            password: originalPassword
        })

        const userHasEncryptedPassword = await compare(originalPassword, user.password);
        expect(userHasEncryptedPassword).toBeTruthy()
    })

    it('Should be able to throw error when user already exists', async () => {
        const user = makeUser({})
        
        userContractMock.users = [user]

        expect(async() => {
            await userUseCase.run({
                email: user.email,
                name: "fakename",
                password: "fakepass"
            })
        }).rejects.toThrow(UserAlreadyExistsException)
    })
});