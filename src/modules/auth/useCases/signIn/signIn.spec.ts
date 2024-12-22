import { JwtService } from "@nestjs/jwt";
import { SignInUseCase } from "./signIn.useCase";
import { makeUser } from "@/modules/user/factories/user.factory";
import { IUserPayload } from "../../models/userPayload.model";

let jwtService: JwtService;
let signInUseCase: SignInUseCase;
describe('SignInUseCase', () => {
    beforeEach(() => {
        jwtService = new JwtService({
            secret: "secret"
        });
        signInUseCase = new SignInUseCase(jwtService);
    })

    it('Should be able to create valid access token', async() => {
        const user = makeUser({});
        const token = await signInUseCase.run({ user });
        const payload = jwtService.decode(token) as IUserPayload;

        expect(payload.sub).toBe(user.id);
    })
});