import { ValidateUserUseCase } from "./validateUser.useCase"
import { UserContractMock } from "@user/contracts/mocks/user-contract.mock"
import { hash } from "bcrypt"
import { makeUser } from "@/modules/user/factories/user.factory"
import { AuthValueIncorrectException } from "../../exceptions/authValueIncorrect.exception"

let userContractMock = new UserContractMock()
let validateUserUseCase = new ValidateUserUseCase(userContractMock)

describe('ValidateUserUseCase', () => {
    beforeEach(() => {
        userContractMock = new UserContractMock()
        validateUserUseCase = new ValidateUserUseCase(userContractMock)
    })

    it('Should be able to return user data when credentials are correct', async () => {
        const userOriginalPassword = "passwordfake"
        const user = makeUser({
            password: await hash(userOriginalPassword, 10)
        })

        userContractMock.users = [user]
        const result = await validateUserUseCase.run({
            email: user.email,
            password: userOriginalPassword
        })

        expect(result).toEqual(user)
    })

    it('Should be able to throw error when pass incorrect credentials', async () => {
        const userOriginalPassword = "passwordfake"
        const user = makeUser({
            password: await hash(userOriginalPassword, 10)
        })

        userContractMock.users = [user]
        expect(async () => {
            await validateUserUseCase.run({
                email: user.email,
                password: "wrongpassword"
            })
        }).rejects.toThrow(AuthValueIncorrectException)

        expect(async () => {
            await validateUserUseCase.run({
                email: "wrongmail@wrongmail.com",
                password: userOriginalPassword
            })
        }).rejects.toThrow(AuthValueIncorrectException)
    })
})