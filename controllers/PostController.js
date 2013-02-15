module.exports = function(models, routes){

    this.postIndex = function(req, res){
    
        models.Post.find({},null,{sort:{
        date: -1 //Sort by Date Added DESC
    }}, function(err, posts){
      
            if (err) return handleError(err);
      
            res.render('posts/index', {
                title: 'Node.js Blog!',
                posts: posts,
                routes: routes
            });
        });
    };
    
    this.postListJson= function(req, res){
    
        models.Post.find({}, function(err, posts){
      
            if (err) return handleError(err);
      
            res.send(posts);
        });
    };

    this.postCreateGet = function(req, res){
    
        res.render('posts/create', {
            title: 'Create post',
            routes: routes
        });
    };
    
    this.postRemove = function(req, res){
       
        models.Post.remove({
            _id: req.params.id
        }, function (err, post) {
            
            if (err) return handleError(err);
            res.redirect(routes.posts);
        });
    };
    
    this.postUpdateGet = function(req, res){
       
        models.Post.findById(req.params.id, function (err, post) {
            
            if (err) return handleError(err);
            
            res.render('posts/update', {
                title: 'Edit post',
                post: post,
                routes: routes
            });
            
        });
    };
    
    this.postUpdatePost = function(req, res){
       
        if(req.body.name && req.body.content) {
       
            models.Post.update({
                _id: req.params.id
            }, {
                name: req.body.name ,
                content: req.body.content 
            }, {
                multi: false
            }, function (err, numberAffected, raw) {
                if (err) return handleError(err);
                console.log('The number of updated documents was %d', numberAffected);
                console.log('The raw response from Mongo was ', raw);
            
                res.redirect(routes.posts);
            });
        
        } else
    
            res.render('posts/create', {
                title: 'Create post',
                error: 'all fields must be filled'
            });
    };

    this.postCreatePost = function(req, res){
    
        if(req.body.name && req.body.content) {
        
            var post = new models.Post({
                name: req.body.name,
                content: req.body.content
            });
            
            post.save(function (err) {
                if (err) return handleError(err);
            
                res.redirect(routes.posts);
            })       
        
        } else
    
            res.render('posts/create', {
                title: 'Create post',
                error: 'all fields must be filled'
            });

    };
    
    return this;
};