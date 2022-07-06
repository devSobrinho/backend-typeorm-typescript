import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        if (!token) throw new Error();

        const { sub: user_id } = verify(
            token,
            process.env.JWT_SECRET_KEY as string
        ) as IPayload;

        // const usersRepository = new UsersRepository();

        // const user = await usersRepository.findById(user_id);

        // if (!user || !user.id) {
        //     throw new AppError('User does not exists', 401);
        // }

        if (!user_id) {
            throw new AppError('Token invalid', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error: any) {
        if (error.message && error.statusCode)
            throw new AppError(error.message, error.statusCode);

        throw new AppError('Invalid token', 401);
    }
}
