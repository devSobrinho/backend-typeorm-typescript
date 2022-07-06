import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id: user_id } = request.user;
            const avatar_file = request.file!.filename;

            const updateUserAvatarUseCase = container.resolve(
                UpdateUserAvatarUseCase
            );
            await updateUserAvatarUseCase.execute({
                user_id,
                avatar_file,
            });

            return response.status(204).send();
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
}

export { UpdateUserAvatarController };
