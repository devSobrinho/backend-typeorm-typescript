interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    drive_license: string;
    avatar?: string;
    id?: string;
}

export { ICreateUserDTO };
