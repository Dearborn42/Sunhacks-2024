import Post from "../models/Posts.js";

export async function getPosts(req, res){
    const { skills } = req.params;
    try {
        const allSkills = skills.split(",");
        const allPosts = await Post.find({
            desiredSkills: { $in: allSkills }
        });
        return res.status(200).json({success: true, posts: JSON.stringify(allPosts)});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export async function getPost(req, res){
    const { id } = req.params;
    try {
        const post = await Post.findOne({ _id: id });
        if(post)
            return res.status(200).json({success: true, post: JSON.stringify(post)});

        return res.status(404).json({success: false, message: "Post not found"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export async function getPersonalPosts(req, res){
    const { userName } = req.params;
    try {
        const posts = await Post.find({userName});
        return res.status(200).json({success: true, posts: JSON.stringify(posts)});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export async function createPost(req, res){
    try {
        const post = new Post(req.body);
        await post.save();
        return res.status(200).json({success: true});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

export async function updatePost(req, res){
    const {title, date} = req.params;
    try {
        const post = await Post.findOneAndUpdate(
            {title, date},
            {$set: req.body},
            {new:true}
        );

        if(post)
            return res.status(200).json({success: true});

        return res.status(400).json({success: false, message: "Invalid data"});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}

export async function deletePost(req, res){
    const {title, date} = req.params;
    try {
        const post = Post.deleteOne({title, date});
        if(post)
            return res.status(200).json({success: true});

        return res.status(400).json({success: false, message: "Invalid data"});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}