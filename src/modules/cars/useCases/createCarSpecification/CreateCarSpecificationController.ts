import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { car_id } = request.query;
            const { specifications_ids } = request.body;

            const createCarSpecificationUseCase = container.resolve(
                CreateCarSpecificationUseCase
            );
            const specificationCar =
                await createCarSpecificationUseCase.execute({
                    car_id: String(car_id) as string,
                    specifications_ids,
                });

            return response.status(201).json({ specificationCar });
        } catch (error) {
            return response.status(500).json({ error });
        }
    }
}

export { CreateCarSpecificationController };
