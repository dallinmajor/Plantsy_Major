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
        db.User
            .findOne({ "username": req.params.username })
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
            .findOne(req.body)
            .populate({
                path: 'plants',
                populate: {
                    path: 'comments',
                    model: 'Comment',
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        console.log(req.body);
        db.User
            .create(req.body)
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({ "username": req.params.username }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findOne({ "username": req.params.username })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
