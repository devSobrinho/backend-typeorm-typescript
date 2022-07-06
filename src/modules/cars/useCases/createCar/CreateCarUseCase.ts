import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        name,
        license_plate,
        fine_amount,
        description,
        daily_rate,
        brand,
        category_id,
        specifications,
    }: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carAlreadyExists) throw new AppError('Car already exists', 404);

        const car = await this.carsRepository.create({
            name,
            license_plate,
            fine_amount,
            description,
            daily_rate,
            brand,
            category_id,
            specifications,
        });

        return car;
    }
}

export { CreateCarUseCase };
