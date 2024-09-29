import express from 'express';
import {
    getPosts,
    getPost,
    getPersonalPosts,
    createPost,
    updatePost,
    deletePost
} from "../controllers/post_controller.js"
const router = express.Router();

router.get("/get-multi/:skills", getPosts);
router.get("/get/:id", getPost);
router.get("/get-personal/:userName", getPersonalPosts);
router.post("/create", createPost);
router.put("/update/:title/:date", updatePost);
router.delete("/delete/:title/:date", deletePost);

export default router