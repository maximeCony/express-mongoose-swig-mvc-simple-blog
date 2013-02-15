module.exports = function(models, routes){

    this.commentCreateGet = function(req, res){
        
        models.Post.findById(req.params.id, function (err, post) {
            
            if (err) return handleError(err);
            
            res.render('comments/create', {
                title: 'Create comment',
                routes: routes,
                post: post
            });
            
        });
        
    };
    
    this.commentCreatePost = function(req, res){
    
        if(req.body.author && req.body.content) {
        
            models.Post.findById(req.params.id, function (err, post) {
            
                if (err) return handleError(err);
            
                var comment = new models.Comment({
                    author: req.body.author,
                    content: req.body.content
                });
            
                post.comments.push(comment);
            
                //TO DO find how not to change the _id
                post.save(function (err) {
                    
                    if (err) return handleError(err);
                    
                    res.redirect(routes.posts);
                });  
            
            });
            
        } else
    
            res.render('comment/create', {
                title: 'Create post',
                error: 'all fields must be filled',
                post: post
            });

    };
    
    return this;
};