import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IRequest {
    user_id: string;
}

class ListUserSenderComplimentsService {

    async execute({ user_id }: IRequest) {
        const compliementRepository = getCustomRepository(ComplimentsRepositories);

        const compliments = await compliementRepository.find({
            where: {
                user_sender: user_id
            },
            relations: [
                "userSender", "userReceiver", "tag"
            ]
        });

        return compliments;
    }
}

export { ListUserSenderComplimentsService };