import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IListCarDTO } from '../dtos/IListCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    // update(data: ICreateCarDTO): Promise<void>;
    // delete(): Promise<void>;
    findAvailableAll(data?: IListCarDTO): Promise<Car[]>;
    findByLicensePlate(license_plate: string): Promise<Car | undefined>;
    findById(id: string): Promise<Car | undefined>;
    findByIdAvailable(id: string): Promise<Car | undefined>;
}

export { ICarsRepository };
