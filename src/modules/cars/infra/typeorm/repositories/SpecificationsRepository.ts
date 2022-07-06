import { getRepository, Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
    ISpecificationsDTO,
    ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Repository<Specification>;
    constructor() {
        this.specifications = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ISpecificationsDTO): Promise<Specification> {
        const specification = this.specifications.create({
            name,
            description,
        });
        await this.specifications.save(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification | undefined> {
        const specification = await this.specifications.findOne({
            where: { name },
        });
        return specification;
    }

    async list(): Promise<Specification[]> {
        const specifications = this.specifications.find();
        return specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = await this.specifications.findByIds(ids);
        return allSpecifications;
    }
}

export { SpecificationsRepository };
