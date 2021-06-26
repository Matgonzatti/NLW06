import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from 'class-transformer';

class ListTagService {

    async execute() {
        const tagsRepositoriy = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositoriy.find();

        return classToPlain(tags);
    }
}

export { ListTagService };