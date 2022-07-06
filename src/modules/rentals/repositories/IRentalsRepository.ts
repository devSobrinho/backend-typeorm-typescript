import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
    findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
    create(data: ICreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental | undefined>;
    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
