module.exports = function(mongoose, models) {
  
  var collection = 'Post'
  , Schema = mongoose.Schema;

  var schema = new Schema({
    name: String,
    content: String,
    date: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  })
  .pre('remove', function(next) {
    //Delete Cascade
    models.Comment.remove({post: this._id}).exec();
    next();
  });

  this.model = mongoose.model(collection, schema);

  return this;
};