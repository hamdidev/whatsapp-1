import express from 'express';
import {postMessage, getMessages} from '../controllers/messagesCtrl.js'
const router = express.Router();

router.route('/')
    .post(postMessage)
    .get(getMessages)


export default router;