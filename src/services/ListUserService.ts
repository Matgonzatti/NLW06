import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { classToPlain } from 'class-transformer';

class ListUserService {

    async execute() {
        const userRepositoriy = getCustomRepository(UsersRepositories);

        const users = await userRepositoriy.find();

        return classToPlain(users);
    }
}

export { ListUserService };