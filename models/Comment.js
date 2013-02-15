module.exports = function(mongoose, models) {
  
    var collection = 'Comment'
    , Schema = mongoose.Schema;

    var schema = new Schema({
        author: String,
        date: { type: Date, default: Date.now },
        content: String
    });

    this.model = mongoose.model(collection, schema);

    return this;
};