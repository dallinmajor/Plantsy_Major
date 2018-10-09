var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({

    comment: {
        type: String,
        required: true
    },

    userName:  {
        type: String,
        required: true
    },
    userImg:  {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

var Comments = mongoose.model("Comment", CommentsSchema);

module.exports = Comments;

