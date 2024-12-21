import { CreateUserUseCase } from "./createUser.useCase";
import { UserContractMock } from "../../contracts/mocks/user-contract.mock";

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
});