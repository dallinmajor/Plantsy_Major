const db = require('../models');

module.exports = {
    findAll: function (req, res) {
      db.Comments
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
      db.Comments
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
      console.log(req.body);
      db.Comments
        .create(req.body)
        .then(comment => {
          console.log(comment);
          db.Plant.findByIdAndUpdate((req.params.plantId),
            { $push: { comments: comment._id }, })
            .then(() => res.json(comment));
        })
        .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
      db.Comments
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
      db.Comments
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(() => res.send('Comment deleted!!'))
    },
  
    removeFromPlant: function (req, res) {
      console.log(req.params.commentId);
      console.log(req.params.plantId);
      db.Comments
        .findById({ _id: req.params.commentId })
        .then(dbModel => dbModel.remove())
        .then(() => {
          db.Plant
            .findByIdAndUpdate((req.params.plantId), {
                $pull: { comments: req.params.commentId }
              })
            .then(() => res.send('comment from plant!'))
        })
        .catch(err => res.status(422).json(err));
    }
  };
  