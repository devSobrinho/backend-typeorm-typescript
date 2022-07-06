import { NextFunction, Request, Response } from 'express';

import { UsersRepositoryInMemorySingleton } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemorySingleton';

import { ensureAdmin } from './ensureAdmin';

let usersRepositoryInMemorySingleton: UsersRepositoryInMemorySingleton;

jest.mock(
    '@modules/accounts/infra/typeorm/repositories/UsersRepository',
    () => {
        return {
            UsersRepository: UsersRepositoryInMemorySingleton,
        };
    }
);

describe('Ensure Admin', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const nextFunction: NextFunction = jest.fn();

    beforeEach(async () => {
        usersRepositoryInMemorySingleton =
            new UsersRepositoryInMemorySingleton();
        mockRequest = {
            user: {
                id: 'idteste',
            },
        };
        mockResponse = {
            json: jest.fn(),
        };
    });

    it('should show an error if there is no user or the user is not admin', () => {
        expect(async () => {
            await ensureAdmin(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toHaveProperty('message', 'User not is admin');

        expect(nextFunction).toBeCalledTimes(0);
    });

    it('should pass the request to an admin user ', async () => {
        await usersRepositoryInMemorySingleton.create({
            id: 'idAdmin',
            password: '123456',
            name: 'admin name',
            email: 'admin@admin.com',
            drive_license: 'AaAaAa',
        });
        await usersRepositoryInMemorySingleton.updateUserAdmin('idAdmin');

        const mockRequest = {
            user: {
                id: 'idAdmin',
            },
        };
        await ensureAdmin(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toBeCalledTimes(1);
    });
});
