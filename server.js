var express = require("express")
, app = express()
, cons = require('consolidate')
, mongoose = require('mongoose')
, swig = require('swig')
, server = require('http').createServer(app);

//load server config
var config = require('./config.js')(app, express, mongoose, cons, swig);

//load models
var models = {};
models.Post = require('./models/Post')(mongoose, models).model;
models.Comment = require('./models/Comment')(mongoose, models).model;

app.locals({

    routes: {
        posts: '/posts',
        postsJson: '/posts.json',
        postsRemove: '/posts/:id/remove',
        postsUpdate: '/posts/:id/update',
        postsCreate: '/posts/create',
        commentCreate: '/posts/:id/comments/create',
        login: '/login',
        logout: '/logout'
   }
});

//load controllers
var postController = require('./controllers/PostController')(models, app);
var commentController = require('./controllers/CommentController')(models, app);
var securityController = require('./controllers/SecurityController')(models, app);

//get /
app.get('/', function(req, res){
	//redirect to /posts
	res.redirect(app.locals.routes.posts);
});

//match routes and controllers
//check auth with the securityController
app.get(app.locals.routes.posts, postController.postIndex);
app.get(app.locals.routes.postsJson, securityController.checkAuth, postController.postListJson);
app.get(app.locals.routes.postsRemove, securityController.checkAuth, postController.postRemove);
app.get(app.locals.routes.postsUpdate, securityController.checkAuth, postController.postUpdateGet);
app.post(app.locals.routes.postsUpdate, securityController.checkAuth, postController.postUpdatePost);
app.get(app.locals.routes.postsCreate, securityController.checkAuth, postController.postCreateGet);
app.post(app.locals.routes.postsCreate, securityController.checkAuth, postController.postCreatePost);

app.get(app.locals.routes.commentCreate, commentController.commentCreateGet);
app.post(app.locals.routes.commentCreate, commentController.commentCreatePost);

app.get(app.locals.routes.logout, securityController.logout);
app.get(app.locals.routes.login, securityController.loginGet);
app.post(app.locals.routes.login, securityController.loginPost);


//start listening
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});