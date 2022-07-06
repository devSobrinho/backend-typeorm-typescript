import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticationUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            const authenticationUser = container.resolve(
                AuthenticateUserUseCase
            );
            const authenticateInfo = await authenticationUser.execute({
                email,
                password,
            });
            return response.status(200).json(authenticateInfo);
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
}

export { AuthenticationUserController };
