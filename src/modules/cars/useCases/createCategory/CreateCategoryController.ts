import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, description } = request.body;

            console.log('test CONTROLLER CATEGORIES');
            const createCategoryUseCase = container.resolve(
                CreateCategoryUseCase
            );
            console.log('CATEGORIES PASSED');

            await createCategoryUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (error) {
            console.log('error', error);
            return response.status(500).json({ error });
        }
    }
}

export { CreateCategoryController };
