module.exports = function(models, app){

    /**
    * send the create comment form
    */
    this.commentCreateGet = function(req, res){
        
        models.Post.findById(req.params.id, function (err, post) {
            
            if (err) return handleError(err);
            //render the view
            res.render('comments/create', {
                post: post,         //pass the related post
                isAdmin: req.session.isAdmin
            });
        });
        
    };

    /**
    * create a comment
    */
    this.commentCreatePost = function (req, res) {

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
                //set the comment post
                comment.post = post;

                //save it
                comment.save(function (err, comment) {
                    if (err) return handleError(err);

                    post.comments.push(comment._id);
                    //save it
                    post.save(function (err) {
                        if (err) return handleError(err);
                        //redirect to /posts
                        res.redirect(app.locals.routes.posts);
                    });
                });
            });   
            
        } else {
            //If there is some missing parameters render the form with the error
            res.render('comment/create', {
                error: 'all fields must be filled',
                post: post,
                isAdmin: req.session.isAdmin
            });
        }
    };
    
    return this;
};