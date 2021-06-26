import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IRequest {
    user_id: string;
}

class ListUserReceiverComplimentsService {

    async execute({ user_id }: IRequest) {
        const compliementRepository = getCustomRepository(ComplimentsRepositories);

        const compliments = await compliementRepository.find({
            where: {
                user_receiver: user_id
            },
            relations: [
                "userSender", "userReceiver", "tag"
            ]
        });

        return compliments;
    }
}

export { ListUserReceiverComplimentsService };