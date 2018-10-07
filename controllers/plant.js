const db = require('../models');

module.exports = {
    findAll: function (req, res) {
        db.Plant
            .find(req.query)
            .populate('comments')
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Plant
            .findById(req.params.id)
            .populate('comments')
            .sort({ data: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Plant
            .create(req.body)
            .then(dbModel => {
                db.User
                    .updateOne({
                        username: req.params.username
                    }, {
                            $push: { plants: dbModel._id }
                        })
                    .then(() => res.send(dbModel))

            })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        console.log(req.body);
        db.Plant
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    remove: function (req, res) {
        db.Plant
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(() => res.send('deleted!'))
            .catch(err => res.status(422).json(err));
    },

    removePlantFromUser: function (req, res) {
        db.Plant
            .findById({ _id: req.params.plantId })
            .then(dbModel => dbModel.remove())
            .then(() => {
                db.User
                    .updateOne({
                        username: req.params.username
                    }, {
                            $pull: { plants: req.params.plantId }
                        })
            })
            .then(() => res.json('deleted from both db and user array'))
            .catch(err => res.status(422).json(err));
    }
};
