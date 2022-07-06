import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Password or Email incorrect!');
        }
        const isAuthentication = await compare(password, user.password);

        if (!isAuthentication) {
            throw new AppError('Password or Email incorrect!');
        }

        const token = sign(
            {
                email: user.email,
                isAdmin: user.isAdmin,
                name: user.name,
                drive_license: user.drive_license,
            },
            process.env.JWT_SECRET_KEY as string,
            {
                subject: user.id,
                expiresIn: '1d',
            }
        );

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}
export { AuthenticateUserUseCase };
