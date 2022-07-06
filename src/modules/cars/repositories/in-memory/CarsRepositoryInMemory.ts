import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarDTO } from '@modules/cars/dtos/IListCarDTO';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    private repository: Car[] = [];

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, { ...data });
        this.repository.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        return this.repository.find(car => car.license_plate === license_plate);
    }

    async findAvailableAll({
        name,
        brand,
        category_id,
    }: IListCarDTO): Promise<Car[]> {
        const list = this.repository.filter(car => {
            if (
                car.available === true ||
                (name && car.name.includes(name)) ||
                (brand && car.brand.includes(brand)) ||
                (category_id && car.category.id === category_id)
            ) {
                return car;
            }
            return null;
        });

        return list;
    }

    async findById(id: string): Promise<Car | undefined> {
        const car = this.repository.find(car => car.id === id);
        return car;
    }

    async findByIdAvailable(id: string): Promise<Car | undefined> {
        const car = this.repository.find(
            car => car.id === id && car.available === true
        );
        return car;
    }
}

export { CarsRepositoryInMemory };
