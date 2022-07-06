import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

// mock return of function jwt.sign
jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
    sign: jest.fn().mockReturnValue({ token: 'sasdsdsd' }),
}));

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should be ale to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'User name',
            email: 'dev@gmail.com',
            password: '121212',
            drive_license: '-dsdsd',
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false user',
                password: 'falseemail@gmail.com',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate to if incorrect password', async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'User name',
                email: 'dev@gmail.com',
                password: '121212',
                drive_license: '-dsdsd',
            };
            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'password incorrect',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
