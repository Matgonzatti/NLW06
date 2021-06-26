import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id, user_receiver, user_sender, message }: IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentsRepositories);
        const userRepository = getCustomRepository(UsersRepositories);

        const userReceiverExists = await userRepository.findOne(user_receiver);

        if (!userReceiverExists) {
            throw new Error("User receiver doesn't exists");
        }

        if (user_receiver === user_sender) {
            throw new Error("You cannot create compliment to yourself");
        }

        const compliment = complimentsRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };