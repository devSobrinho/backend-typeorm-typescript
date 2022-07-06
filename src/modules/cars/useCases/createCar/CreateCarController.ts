import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const {
                name,
                license_plate,
                fine_amount,
                description,
                daily_rate,
                brand,
                category_id,
            } = request.body;

            const createCarUseCase = container.resolve(CreateCarUseCase);
            const car = await createCarUseCase.execute({
                name,
                license_plate,
                fine_amount,
                description,
                daily_rate,
                brand,
                category_id,
            });

            return response.status(201).json({ car });
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
}

export { CreateCarController };
