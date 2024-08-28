const router = require('express').Router();
const Blog = require('../models/blog');

// Route to render the page for creating a new blog
router.get('/create', (req, res) => {
    if (!req.user) {
        // Redirect to login page if the user is not authenticated
        return res.redirect('/auth/login');
    }
    res.render('create', { user: req.user, title: 'Create a New Blog' });
});

// Route to get all blogs, sorted by most recent updates
router.get('/', (req, res) => {
    Blog.find().sort({ updatedAt: -1 })
        .then((result) => {
            res.render('index', { user: req.user, title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            console.log('Error fetching blogs:', err);
        });
});

// Route to create a new blog post
router.post('/', (req, res) => {
    const blogData = req.body;
    blogData.author = req.user.username;
    blogData.googleID = req.user.googleID;

    const blog = new Blog(blogData);

    blog.save()
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log('Error saving blog:', err);
        });
});

// Route to get details of a specific blog by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            if (!result) {
                // Handle case where blog is not found
                return res.status(404).render('404', { title: 'Blog Not Found' });
            }
            res.render('details', { user: req.user, blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            console.log('Error fetching blog:', err);
            res.status(500).render('404', { title: 'Blog Not Found' });
        });
});

// Route to delete a specific blog by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(() => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log('Error deleting blog:', err);
            res.status(500).json({ error: 'Error deleting blog' });
        });
});

// Route to render the edit page for a specific blog by ID
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).render('404', { title: 'Blog Not Found' });
        }
        res.render('edit', { blog: blog, title: 'Edit Blog', user: req.user });
    } catch (err) {
        console.log('Error fetching blog for editing:', err);
        res.status(500).render('404', { title: 'Blog Not Found' });
    }
});

// Route to update a specific blog by ID
router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Blog.findByIdAndUpdate(id, {
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body
        });
        res.redirect('/blogs');
    } catch (err) {
        console.log('Error updating blog:', err);
        res.status(500).render('404', { title: 'Error Updating Blog' });
    }
});

module.exports = router;
