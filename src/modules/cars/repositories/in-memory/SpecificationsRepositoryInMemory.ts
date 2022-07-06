/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
    ISpecificationsDTO,
    ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private repository: Specification[] = [];

    async create({
        name,
        description,
    }: ISpecificationsDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
        });
        this.repository.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification | undefined> {
        return this.repository.find(
            specification => specification.name === name
        );
    }
    async list(): Promise<Specification[]> {
        return this.repository;
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.repository.filter(specification =>
            ids.includes(specification.id!)
        );

        return allSpecifications!;
    }
}

export { SpecificationsRepositoryInMemory };
