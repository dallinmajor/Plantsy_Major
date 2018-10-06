var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({

    comment: String,

    date: {
        type: Date,
        default: Date.now
    }
});

var Comments = mongoose.model("Comment", CommentsSchema);

module.exports = Comments;
