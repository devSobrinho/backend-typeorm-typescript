import { inject, injectable } from 'tsyringe';

import { IListCarDTO } from '@modules/cars/dtos/IListCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ name, brand, category_id }: IListCarDTO): Promise<Car[]> {
        const all = await this.carsRepository.findAvailableAll({
            name,
            brand,
            category_id,
        });

        return all;
    }
}

export { ListAvailableCarUseCase };
