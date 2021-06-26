import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { AuthenticateController } from './controllers/AuthenticateController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController';
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentsController';
import { ListTagController } from './controllers/ListTagController';
import { ListUserController } from './controllers/ListUserController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateController = new AuthenticateController();
const createComplimentController = new CreateComplimentController();
const listUserSenderComplimentsService = new ListUserSenderComplimentsController();
const listUserReceiverComplimentsService = new ListUserReceiverComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

router.post("/login", authenticateController.handle);
router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUserController.handle);
router.get("/users/compliments/send", ensureAuthenticated, listUserSenderComplimentsService.handle)
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiverComplimentsService.handle)

router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/tags", ensureAuthenticated, listTagController.handle);

export { router };
