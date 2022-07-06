/* eslint-disable no-unused-expressions */
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';
import { UsersRepositoryInMemory } from './UsersRepositoryInMemory';

export class UsersRepositoryInMemorySingleton implements IUsersRepository {
    public static INSTANCE: UsersRepositoryInMemory =
        new UsersRepositoryInMemorySingleton().getInstance();

    private setInstance() {
        const userRepositoryInstance = new UsersRepositoryInMemory();
        UsersRepositoryInMemorySingleton.INSTANCE = userRepositoryInstance;
        return userRepositoryInstance;
    }

    private getInstance() {
        if (!UsersRepositoryInMemorySingleton.INSTANCE) {
            this.setInstance();
        }
        return UsersRepositoryInMemorySingleton.INSTANCE;
    }

    async create({
        drive_license,
        password,
        name,
        email,
        avatar,
        id,
    }: ICreateUserDTO): Promise<User> {
        const user = await UsersRepositoryInMemorySingleton.INSTANCE.create({
            drive_license,
            password,
            name,
            email,
            id,
            avatar,
        });
        return user;
    }

    async list(): Promise<User[]> {
        const all = await UsersRepositoryInMemorySingleton.INSTANCE.list();
        return all;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await UsersRepositoryInMemorySingleton.INSTANCE.findById(
            id
        );

        return user;
    }

    async updateUserAdmin(id: string): Promise<User | undefined> {
        const user = await UsersRepositoryInMemorySingleton.INSTANCE.findById(
            id
        );
        if (user) {
            Object.assign(user, {
                isAdmin: true,
            });
        }

        return user;
    }

    update({
        drive_license,
        password,
        name,
        email,
    }: ICreateUserDTO): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findByEmail(email: string): Promise<User | undefined> {
        throw new Error('Method not implemented.');
    }
}
