import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListCarDTO } from '@modules/cars/dtos/IListCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { whereWithOptionalCondition } from '@utils/whereWithOptionalCondition';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            ...data,
        });

        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
        const car = await this.repository.findOne({ where: { license_plate } });
        return car;
    }

    async findAvailableAll({
        name,
        brand,
        category_id,
    }: IListCarDTO): Promise<Car[]> {
        // typeORM with optional conditional where
        // const where = whereWithOptionalCondition({
        //     name,
        //     brand,
        //     category_id,
        //     available: true,
        // });

        // const list = await this.repository.find({
        //     where,
        // });
        // return list;

        // typeORM using quseryBuilder to do conditional optional at the where
        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (brand) {
            carsQuery.andWhere('brand = :brand', { brand });
        }
        if (name) {
            carsQuery.andWhere('name = :name', { name });
        }
        if (category_id) {
            carsQuery.andWhere('category_id = :category_id', {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car | undefined> {
        const car = await this.repository.findOne(id);
        return car;
    }

    async findByIdAvailable(id: string): Promise<Car | undefined> {
        const car = await this.repository.findOne({
            where: {
                id,
                available: true,
            },
        });
        return car;
    }
}

export { CarsRepository };
