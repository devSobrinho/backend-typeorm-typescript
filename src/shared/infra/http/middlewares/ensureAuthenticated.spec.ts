import { NextFunction, Request, Response } from 'express';

import { UsersRepositoryInMemorySingleton } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemorySingleton';
import { AppError } from '@shared/errors/AppError';

import { ensureAuthenticated } from './ensureAuthenticated';

let usersRepositoryInMemory: UsersRepositoryInMemorySingleton;

jest.mock('jsonwebtoken', () => {
    return {
        verify: (token: string, SecretKeyJWT: string) => {
            return { sub: token };
        },
    };
});

jest.mock(
    '@modules/accounts/infra/typeorm/repositories/UsersRepository',
    () => {
        return {
            UsersRepository: UsersRepositoryInMemorySingleton,
        };
    }
);

describe('Ensure Authenticate', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    const nextFunction: NextFunction = jest.fn();

    beforeAll(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemorySingleton();
        await usersRepositoryInMemory.create({
            drive_license: 'drive_license 1',
            email: 'email@email.com 1',
            password: 'password 1',
            name: 'name user 1',
            id: 'idMock',
        });
    });

    beforeEach(async () => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
        };
    });
    // fit
    it('should give an error if there is no token in the headers authorization', async () => {
        expect(async () => {
            await ensureAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toBeInstanceOf(AppError);
        expect(async () => {
            await ensureAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toHaveProperty('statusCode', 401);
    });

    it('should give an error if not exist token', async () => {
        mockRequest = {
            headers: {
                authorization: 'tokenInvalid',
            },
        };

        expect(async () => {
            await ensureAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toBeInstanceOf(AppError);
        expect(async () => {
            await ensureAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toHaveProperty('message', 'Invalid token');
    });

    it('should give an error if not exist user', async () => {
        mockRequest = {
            headers: {
                authorization: 'Bearer id1a',
            },
        };

        expect(async () => {
            await ensureAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toBeInstanceOf(AppError);
        expect(async () => {
            await ensureAuthenticated(
                mockRequest as Request,
                mockResponse as Response,
                nextFunction
            );
        }).rejects.toHaveProperty('message', 'User does not exists');
    });

    it('should put the user and pass the id in the request if it is authenticated', async () => {
        mockRequest = {
            headers: {
                authorization: 'Bearer idMock',
            },
        };
        await ensureAuthenticated(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );
        expect(mockRequest.user).toHaveProperty('id');
    });
});
