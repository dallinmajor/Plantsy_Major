var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlantSchema = new Schema({

    name: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        ref: 'uploads'
    },
    description: {
        type: String,
    },
    health: {
        type: String,
        default: "thriving"
    },
    comments: [{
        type: String,
        ref: 'Comment'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

var Plant = mongoose.model("Plant", PlantSchema);

module.exports = Plant;