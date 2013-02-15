module.exports = function(mongoose, models) {
  
  var collection = 'Post'
  , Schema = mongoose.Schema;

  var schema = new Schema({
    name: String,
    content: String,
    date: { type: Date, default: Date.now },
    comments: [models.Comment]
  });

  this.model = mongoose.model(collection, schema);

  return this;
};