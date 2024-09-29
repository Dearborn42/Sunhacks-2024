import express from 'express';
import {
    getAccount,
    getPersonalAccount,
    updateAccount,
    deleteAccount,
} from "../controllers/account_controller.js"
const router = express.Router();

router.get("/get/:userName", getAccount);
router.get("/get-personal/:userName", getPersonalAccount);
router.put("/update/:userName", updateAccount);
router.delete("/delete/:userName", deleteAccount);
export default router