import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        drive_license,
        password,
        name,
        email,
        avatar,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            drive_license,
            password,
            name,
            email,
            avatar,
        });
        await this.repository.save(user);
        // await getConnection().queryResultCache?.remove(['list_users']);
        return user;
    }

    async update({
        drive_license,
        password,
        name,
        email,
    }: ICreateUserDTO): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(User)
            .set({ drive_license, password, name, email })
            .where('email = :email', { email })
            .execute();
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find({
            // cache: { id: 'list_users', milliseconds: 20000 },
        });
        return users;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ where: { id } });
        return user;
    }
}

export { UsersRepository };
