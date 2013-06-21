module.exports = function(models, app){

    /**
    * get the list of posts
    */
    this.postIndex = function(req, res){
    
        //get all the posts
        models.Post.find({},null,{
            sort:{
                date: -1 //Sort by Date Added DESC
            }
        })
        //populate the comments in the posts objects
        .populate('comments')
        .exec(function(err, posts){
      
            if (err) return handleError(err);
      
            //render the list of posts
            res.render('posts/index', {
                posts: posts,
                isAdmin: req.session.isAdmin
            });
        });
    };
    
    /**
    * get the post list as JSON
    */
    this.postListJson= function(req, res){
    
        //find all posts
        models.Post.find()
        //populate the comments in the posts objects
        .populate('comments')
        .exec(function(err, posts){
      
            if (err) return handleError(err);
            //send the posts
            res.send(posts);
        });
    };

    /**
    * get the create post form
    */
    this.postCreateGet = function(req, res){
    
        //renderthe view
        res.render('posts/create', {
            isAdmin: req.session.isAdmin
        });
    };

    /**
    * create a post
    */
    this.postCreatePost = function(req, res){
    
        //check mandatory fields
        if(req.body.name && req.body.content) {
        
            //create a new post
            var post = new models.Post({
                name: req.body.name,
                content: req.body.content
            });
            
            //save it
            post.save(function (err) {
                if (err) return handleError(err);
                //redirect to /posts
                res.redirect(app.locals.routes.posts);
            });       
        
        } else {
            //If there is some missing parameters render the form with the error
            res.render('posts/create', {
                error: 'all fields must be filled',
                isAdmin: req.session.isAdmin
            });
        }
    };
    
    /**
    * remove a post
    */
    this.postRemove = function(req, res){
       
       //remove the post
        models.Post.remove({
            _id: req.params.id
        }, function (err, post) {
            
            if (err) return handleError(err);
            //redirect to /posts
            res.redirect(routes.posts);
        });
    };
    
    /**
    * gate the update post form
    */
    this.postUpdateGet = function(req, res){
       
        //get the post by _id
        models.Post.findById(req.params.id, function (err, post) {
            
            if (err) return handleError(err);
            
            //render the page
            res.render('posts/update', {
                post: post,
                isAdmin: req.session.isAdmin
            });
            
        });
    };
    
    /**
    * update a post
    */
    this.postUpdatePost = function(req, res){
       
        //check mandatory fields
        if(req.body.name && req.body.content) {
       
            //update the post
            models.Post.update({
                _id: req.params.id  //find by _id
            }, {
                name: req.body.name ,
                content: req.body.content 
            }, {
                multi: false        //since we are finding by id we just need one result
            }, function (err, numberAffected, raw) {
                if (err) return handleError(err);
                //redirect to /posts
                res.redirect(app.locals.routes.posts);
            });
        
        } else {
            
            //If there is some missing parameters render the form with the error
            res.render('posts/create', {
                error: 'all fields must be filled',
                isAdmin: req.session.isAdmin
            });
        }
    };
    
    return this;
};