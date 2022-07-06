import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
    create({
        drive_license,
        password,
        name,
        email,
    }: ICreateUserDTO): Promise<User>;
    update({
        drive_license,
        password,
        name,
        email,
    }: ICreateUserDTO): Promise<void>;
    list(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}
