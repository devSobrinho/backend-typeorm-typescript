/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();

        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            specificationsRepositoryInMemory,
            carsRepositoryInMemory
        );
    });
    it('should not be able to add a new specification to a now-existent car', async () => {
        const car_id = 'aaa';
        const specifications_ids = ['aaaa'];

        expect(async () => {
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_ids,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to add a new specification', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1264',
            name: 'name car',
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: 'specifications 1',
            description: 'description 1',
        });

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id!,
            specifications_ids: [specification.id!],
        });

        expect(specificationsCars).toHaveProperty('specifications');
        expect(specificationsCars.specifications).toHaveLength(1);
    });
});
