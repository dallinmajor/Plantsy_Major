var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({

    user: {
        type: String,
        required: true
    },

    userImg: {
        type: String,
        required: true
    },

    comment: String,

    date: {
        type: Date,
        default: Date.now
    }
});

var Comments = mongoose.model("Comment", CommentsSchema);

module.exports = Comments;
