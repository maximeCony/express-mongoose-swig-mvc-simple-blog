var express = require("express")
, app = express()
, cons = require('consolidate')
, mongoose = require('mongoose')
, swig = require('swig');
    
    
var config = require('./config.js')(app, express, mongoose, cons, swig);

var models = {};
models.Post = require('./models/Post')(mongoose, models).model;
models.Comment = require('./models/Comment')(mongoose, models).model;

var routes = {
    posts : '/posts',
    postsJson : '/posts.json',
    postsRemove : '/posts/:id/remove',
    postsUpdate : '/posts/:id/update',
    postsCreate : '/posts/create',
    commentCreate : '/posts/:id/comments/create',
    login : '/login',
    logout : '/logout'
}

var postController = require('./controllers/PostController')(models, routes);
var commentController = require('./controllers/CommentController')(models, routes);
var securityController = require('./controllers/SecurityController')(models, routes);

app.get(routes.posts, postController.postIndex);
app.get(routes.postsJson, securityController.checkAuth, postController.postListJson);
app.get(routes.postsRemove, securityController.checkAuth, postController.postRemove);
app.get(routes.postsUpdate, securityController.checkAuth, postController.postUpdateGet);
app.post(routes.postsUpdate, securityController.checkAuth, postController.postUpdatePost);
app.get(routes.postsCreate, securityController.checkAuth, postController.postCreateGet);
app.post(routes.postsCreate, securityController.checkAuth, postController.postCreatePost);

app.get(routes.commentCreate, securityController.checkAuth, commentController.commentCreateGet);
app.post(routes.commentCreate, securityController.checkAuth, commentController.commentCreatePost);

app.get(routes.logout, securityController.logout);
app.get(routes.login, securityController.loginGet);
app.post(routes.login, securityController.loginPost);

app.listen(3000);
console.log('Listening on port 3000');