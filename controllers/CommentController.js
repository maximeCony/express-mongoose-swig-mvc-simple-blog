module.exports = function(models, routes){

    /**
    * send the create comment form
    */
    this.commentCreateGet = function(req, res){
        
        models.Post.findById(req.params.id, function (err, post) {
            
            if (err) return handleError(err);
            
            //render the view
            res.render('comments/create', {
                routes: routes,     //pass routes to handle links
                post: post,         //pass the related post
                isAdmin: req.session.isAdmin
            });
            
        });
        
    };
    
    /**
    * create a comment
    */
    this.commentCreatePost = function(req, res){
    
        //check mandatory fields
        if(req.body.author && req.body.content) {
        
            //find the post
            models.Post.findById(req.params.id, function (err, post) {
            
                if (err) return handleError(err);
            
                //create a new comment
                var comment = new models.Comment({
                    author: req.body.author,
                    content: req.body.content
                });
            
                //add it to the post comments
                post.comments.push(comment);
            
                //save the updated post
                post.save(function (err) {
                    
                    if (err) return handleError(err);
                    //redirect to /posts
                    res.redirect(routes.posts);
                });  
            
            });
            
        } else
            //If there is some missing parameters render the form with the error
            res.render('comment/create', {
                error: 'all fields must be filled',
                post: post,
                isAdmin: req.session.isAdmin
            });

    };
    
    return this;
};