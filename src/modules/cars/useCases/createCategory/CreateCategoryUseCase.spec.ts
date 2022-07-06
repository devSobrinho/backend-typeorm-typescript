import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoryRepositoryInMemory
        );
    });

    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category teste',
            description: 'category description teste',
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoryRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty('id');
    });

    it('should be able to create a category with name exists', async () => {
        expect(async () => {
            const category = {
                name: '',
                description: 'category description teste',
            };
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
