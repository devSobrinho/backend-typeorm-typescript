import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

class ListAvailableCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, brand, category_id } = request.query;
            const listAvailableCarUseCase = container.resolve(
                ListAvailableCarUseCase
            );
            const list = await listAvailableCarUseCase.execute({
                name: name as string,
                brand: brand as string,
                category_id: category_id as string,
            });

            return response.status(200).json(list);
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
}

export { ListAvailableCarController };
