import { getRepository, Repository } from 'typeorm';

import { ICreateCarImagesDTO } from '@modules/cars/dtos/ICreateCarImagesDTO';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;
    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create({
        image_name,
        car_id,
    }: ICreateCarImagesDTO): Promise<CarImage> {
        const carImage = this.repository.create({ image_name, car_id });
        await this.repository.save(carImage);
        return carImage;
    }

    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export { CarsImagesRepository };
