import { ICreateCarImagesDTO } from '../dtos/ICreateCarImagesDTO';
import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
    create({ image_name, car_id }: ICreateCarImagesDTO): Promise<CarImage>;
    delete(id: string): Promise<void>;
}

export { ICarsImagesRepository };
