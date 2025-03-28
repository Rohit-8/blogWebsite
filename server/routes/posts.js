const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's posts
router.get('/user', auth, async (req, res) => {
  try {
    console.log('Fetching posts for user:', req.user.id); // Debug log
    const posts = await Post.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .populate('author', 'username');
    console.log('Found posts:', posts); // Debug log
    res.json(posts);
  } catch (err) {
    console.error('Error in /user route:', err); // Debug log
    res.status(500).json({ message: err.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = new Post({
      title,
      content,
      image,
      author: req.user.id
    });
    const savedPost = await newPost.save();
    await savedPost.populate('author', 'username');
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, content, image } = req.body;
    post.title = title;
    post.content = content;
    post.image = image;

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'username');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 