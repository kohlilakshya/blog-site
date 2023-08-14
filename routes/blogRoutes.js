const router = require('express').Router();
const Blog = require('../models/blog');

//code runs from top to bottom
router.get('/create', (req, res) => {
    res.render('create', { user: req.user, title: 'Create a new Blog' });
})

router.get('/',(req,res)=>{
    Blog.find().sort({updatedAt:-1})
        .then((result)=>{
            res.render('index', {user:req.user, title: 'All Blogs', blogs: result})
        })
        .catch((err)=>{
            console.log(err);
        });
} );

router.post('/', (req, res)=>{
    var abc = req.body;
    abc['author'] = req.user.username;
    abc['googleID']= req.user.googleID;
    const blog = new Blog(abc);
    
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
});

router.get('/:id', (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {user:req.user, blog: result, title: 'Blog Details'})   
        })
        .catch((err)=>{
            res.status(404).render('404', { title: 'Blog Not Found' });
        })
});
//same url
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

//colon for variable
router.get('/edit/:id', async (req,res)=>{
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render('edit', {blog:blog, title:'EDIT', user:req.user});
});

//put krte hai sirf update krne ke liye
//post krte hai for updation or creation
router.post('/edit/:id', async (req,res)=>{
    const id = req.params.id;
    var blog = await Blog.findByIdAndUpdate(id, {
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });
    console.log(blog);
    res.redirect('/blogs');
});


module.exports = router;