import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}
    async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
        const carImages: CarImage[] = [];
        const carAlreadyExists = await this.carsRepository.findById(car_id);
        if (!carAlreadyExists) throw new AppError('Car already exists', 404);
        images_name.forEach(async image_name => {
            const carImage = await this.carsImagesRepository.create({
                image_name,
                car_id,
            });
            carImages.push(carImage);
        });

        return carImages;
    }
}

export { UploadCarImagesUseCase };
