const express = require('express');
const { isLoggedIn } = require('../middleware');
const Blog = require('../model/blog');
const User = require('../model/user');
const router = express.Router();


router.get('/user/:userId/posts',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId, (err, users) => {
            // users is an array which may be empty for no results
            if (err) {
              // handle error
              return;
            }
            if (!users.length) {
              // there are user(s)
            }
            else{
                // res.render('empty')
            }
          }).populate('myPosts');
        res.render('user/posts',{myPosts : user.myPosts});
    }
    catch(e){
        req.flash('error','Can\'t load your posts');
        res.redirect('/blog');
    }
})

router.get('/user/:userId/posts/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId , id} = req.params;
        const blog = await Blog.findById(id).populate('reviews');
        res.render('user/postDetails',{blog});
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect(`/user/${req.user._id}/posts`);
    }
})

router.post('/user/:userId/favourites/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId,id} = req.params;
        const blog = await Blog.findById(id);

        const user = req.user;
        let alreadyExists = false;
        for(let fav of user.favourites){
            if(fav._id == id){
                req.flash('success','Blog already exists in your favourites');
                alreadyExists = true;
                break;
            }
            else{
                
            }
        }
        if(!alreadyExists){
            user.favourites.push(blog);
            await user.save();
            req.flash('success','Blog added to favourites successfully');
        }

        res.redirect(`/user/${userId}/favourites`);
    }
    catch(e){
        req.flash('error','Failed to add blog to your favourites');
        res.redirect(`/blog`);
    }
})

router.get('/user/:userId/favourites',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId).populate('favourites');
        res.render('user/favourites',{favourites : user.favourites})
    }
    catch(e){
        req.flash('error','Can\'t load your favourites. Try Again Later!!');
        res.redirect('/blog');
    }
})

router.get('/user/:userId/favourites/:id',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id).populate('reviews');
        res.render('user/favouriteDetails',{blog});
    }
    catch(e){
        req.flash('error','Can\'t load your favourites. Try Again Later!!');
        res.redirect(`/user/${req.params.userId}/favourites`);
    }
})


// TO EDIT DETAILS
router.get('/user/:userId/blog/:id/edit',async(req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        res.render('blog/edit',{blog});
    }
    catch(e){
        req.flash('error','Blog does not exist!!!');
        res.redirect('/error');
    }
})

router.patch('/user/:userId/blog/:id',isLoggedIn,async(req,res)=>{
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.id , req.body.blog);
        req.flash('success','Blog Updated');
        res.redirect(`/user/${req.user._id}/posts/${req.params.id}`);
    }
    catch(e){
        req.flash('error','Failed to update the blog');
        res.redirect(`/blog/${req.params.id}`);
    }
})


// TO DELETE DOCUMENT
router.delete('user/:userId/blog/:id',isLoggedIn,async(req,res)=>{
    try{    
        //to delete from Blog model
        await Blog.findByIdAndDelete(req.params.id);
        //to delete from myPosts array present in User model
        await User.findByIdAndUpdate(req.user._id,{$pull:{myPosts:req.params.id , favourites:req.params.id}}); 
        
        req.flash('success','Blog deleted successfully!!!');
        res.redirect(`/user/${req.user._id}/posts`);
    }
    catch(e){
        req.flash('error','Failed to delete Blog!!!');
        res.redirect(`/blog/${req.params.id}`);
    }
});

router.delete('/user/:userId/favourites/:id',isLoggedIn,async(req,res)=>{
    try{
        const {userId,id} = req.params;
        await User.findByIdAndUpdate(userId,{$pull:{favourites:id}});
        req.flash('success','Successfully removed blog from favourites');
        res.redirect(`/user/${userId}/favourites`);
    }
    catch(e){
        req.flash('success','Failed to remove the blog from favourites');
        res.redirect(`/user/${req.params.userId}/favourites`);
    }
})

module.exports = router;