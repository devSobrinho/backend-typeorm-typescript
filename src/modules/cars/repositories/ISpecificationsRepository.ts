import { Specification } from '../infra/typeorm/entities/Specification';

export interface ISpecificationsDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ISpecificationsDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification | undefined>;
    list(): Promise<Specification[]>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
