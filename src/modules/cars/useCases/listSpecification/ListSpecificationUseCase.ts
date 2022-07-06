import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: SpecificationsRepository
    ) {}

    async execute(): Promise<Specification[]> {
        const specification = await this.specificationsRepository.list();
        return specification;
    }
}

export { ListSpecificationUseCase };
