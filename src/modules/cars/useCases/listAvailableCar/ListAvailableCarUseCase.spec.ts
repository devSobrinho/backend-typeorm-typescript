import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

let listAvailableCarUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarUseCase = new ListAvailableCarUseCase(
            carsRepositoryInMemory
        );
    });

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1234',
            name: 'Car 1',
        });

        const list = await listAvailableCarUseCase.execute({});

        expect(list).toHaveLength(1);
        expect(list).toEqual([car]);
    });

    it('should be able to list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1234',
            name: 'Car 1',
        });

        const list = await listAvailableCarUseCase.execute({ name: 'Car ' });

        expect(list).toHaveLength(1);
        expect(list).toEqual([car]);
    });

    it('should be able to list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1234',
            name: 'Car 1',
        });

        const list = await listAvailableCarUseCase.execute({ brand: 'brand' });

        expect(list).toHaveLength(1);
        expect(list).toEqual([car]);
    });

    it('should be able to list all available cars by category_id', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1234',
            name: 'Car 1',
        });

        const list = await listAvailableCarUseCase.execute({
            category_id: 'categoryId',
        });

        expect(list).toHaveLength(1);
        expect(list).toEqual([car]);
    });
});
