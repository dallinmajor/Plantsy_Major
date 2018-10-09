const db = require('../models');

module.exports = {
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findUser: function (req, res) {
        console.log(req.params.id);
        db.User
            .findById(req.params.id)
            .populate({
                path: 'plants',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                }
            })
            .then(user => res.json(user));
    },
    validateUser: function (req, res) {
        db.User
            .find(req.body)
            .populate({
                path: 'plants',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                }
            })
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(result => {
                console.log(result)
                res.json(result)
            })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ "_id": req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findOne({ "_id": req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
