import express from 'express';
import {
    getAccount
} from "../controllers/account_controller.js"
const router = express.Router();

router.get("/get_account/:userName", getAccount);


export default router