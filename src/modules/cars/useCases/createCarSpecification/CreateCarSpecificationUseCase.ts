import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specifications_ids: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}
    async execute({ car_id, specifications_ids }: IRequest): Promise<Car> {
        const car = await this.carsRepository.findById(car_id);
        if (!car) throw new AppError('Car does not exists', 404);

        const allSpecification = await this.specificationsRepository.findByIds(
            specifications_ids
        );

        if (allSpecification.length <= 0) {
            throw new AppError('Specifications not found', 404);
        }

        // valida se todos os ids enviados das specifications são validos
        specifications_ids.every(id => {
            if (
                allSpecification.find(specification => specification.id !== id)
            ) {
                throw new AppError(
                    `Does not exists specification_id: '${id}'`,
                    404
                );
            }
            return true;
        });

        car.specifications = allSpecification;

        await this.carsRepository.create(car);
        return car;
    }
}

export { CreateCarSpecificationUseCase };
