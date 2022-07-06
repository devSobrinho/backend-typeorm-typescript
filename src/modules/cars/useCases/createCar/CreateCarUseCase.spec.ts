/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it('should be able to create a new car ', async () => {
        const car = await createCarUseCase.execute({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1264',
            name: 'name car',
        });

        expect(car).toHaveProperty('id');
    });
    it('should not be able to create a car with exists license plate', async () => {
        expect(async () => {
            await createCarUseCase.execute({
                brand: 'brand',
                category_id: 'categoryId',
                description: 'description car',
                fine_amount: 1,
                daily_rate: 100,
                license_plate: 'ABC-1234',
                name: 'Car 1',
            });

            await createCarUseCase.execute({
                brand: 'brand',
                category_id: 'categoryId',
                description: 'description car',
                fine_amount: 1,
                daily_rate: 100,
                license_plate: 'ABC-1234',
                name: 'Car 2',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1234',
            name: 'Car 1',
        });

        expect(car.available).toBe(true);
    });

    it('should be able to create a new car with specification', async () => {
        const specification = await specificationRepositoryInMemory.create({
            name: 'specification 1',
            description: 'description',
        });

        const car = await createCarUseCase.execute({
            brand: 'brand',
            category_id: 'categoryId',
            description: 'description car',
            fine_amount: 1,
            daily_rate: 100,
            license_plate: 'ABC-1264',
            name: 'name car',
            specifications: [specification],
        });

        expect(car).toHaveProperty('specifications');
        expect(car.specifications).toHaveLength(1);
    });

    // it('should not be able to create a new car with specification does not exists', async () => {
    //     const specification = await specificationRepositoryInMemory.create({
    //         name: 'specification 1',
    //         description: 'description',
    //     });

    //     const car = await createCarUseCase.execute({
    //         brand: 'brand',
    //         category_id: 'categoryId',
    //         description: 'description car',
    //         fine_amount: 1,
    //         daily_rate: 100,
    //         license_plate: 'ABC-1264',
    //         name: 'name car',
    //         specifications: [
    //             specification,
    //             {
    //                 name: 'name 1',
    //                 description: 'description fake',
    //                 created_at: new Date(),
    //             },
    //         ],
    //     });

    //     console.log('car aqqqqq', car);

    //     // expect(async () => {
    //     //     await createCarUseCase.execute({
    //     //         brand: 'brand',
    //     //         category_id: 'categoryId',
    //     //         description: 'description car',
    //     //         fine_amount: 1,
    //     //         daily_rate: 100,
    //     //         license_plate: 'ABC-1264',
    //     //         name: 'name car',
    //     //         specifications: [
    //     //             specification,
    //     //             {
    //     //                 name: 'name 1',
    //     //                 description: 'description fake',
    //     //                 created_at: new Date(),
    //     //             },
    //     //         ],
    //     //     });
    //     // }).rejects.toBeInstanceOf(AppError);
    // });
});
