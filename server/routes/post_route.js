import express from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} from "../controllers/post_controller.js"
const router = express.Router();

router.get("/get-multi/:skills", getPosts);
router.get("/get/:title/:date", getPost);
router.post("/create", createPost);
router.put("/update/:title/:date", updatePost);
router.delete("/delete/:title/:date", deletePost);

export default router