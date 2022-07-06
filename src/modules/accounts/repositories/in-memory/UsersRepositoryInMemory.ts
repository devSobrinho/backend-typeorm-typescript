import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [
        {
            password: '3232',
            isAdmin: true,
            name: 'name',
            email: 'email',
            drive_license: 'aaa',
            created_at: new Date(),
            avatar: 'aa',
            id: 'adm',
        },
    ];

    async create({
        drive_license,
        password,
        name,
        email,
        avatar,
        id,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            drive_license,
            password,
            name,
            email,
            avatar,
            id,
        });
        this.users.push(user);
        return user;
    }

    async update({
        drive_license,
        password,
        name,
        email,
        id,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === id);
        const user = this.users.find(user => user.id === id);
        if (user) {
            Object.assign(user, {
                drive_license,
                password,
                name,
                email,
                id,
                avatar,
            });
            this.users.splice(userIndex, 1);
            this.users.push(user);
        }
    }

    async list(): Promise<User[]> {
        return this.users;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }
}

export { UsersRepositoryInMemory };
