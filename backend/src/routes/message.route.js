import express from 'express';
const messageRouter = express.Router();
import {getAllContacts,
        getChatPartners,
        getMessageByUserId,
        sendMessage} from '../controllers/message.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js';

messageRouter
        .get('/messages/contacts',protectRoute, getAllContacts)
        .get('/messages/chats', protectRoute, getChatPartners)
        .get('/messages/:id', protectRoute, getMessageByUserId)
        .post('/messages/send/:id', protectRoute, sendMessage)

export default messageRouter;
