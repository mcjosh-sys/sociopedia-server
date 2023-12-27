import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const picturePath = req.file.filename
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find();
    return res.status(201).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({userId});
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)
        isLiked ? post.likes.delete(userId) : post.likes.set(userId, true)
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            {new: true}
      )
        res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
