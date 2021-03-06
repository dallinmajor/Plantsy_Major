const router = require("express").Router();
const upload = require('../../gridfs/upload').upload;
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const conn = require('../../gridfs/connections').conn;
const db = require('../../models');

let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');

});

router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file.filename);
    res.send(req.file.filename);
})

router.post('/picPro/:id', upload.single('image'), (req, res) => {
    db.User
        .findByIdAndUpdate((req.params.id), { profile_picture: req.file.filename })
        .then(dbModel => res.json(req.file.filename))
        .catch(err => res.status(422).json(err));
});


router.post('/picCov/:id', upload.single('image'), (req, res) => {
    //Update user profile_picture. if there is one there replace it
    db.User
        .findByIdAndUpdate((req.params.id), { cover_photo: req.file.filename })
        .then(dbModel => res.json(req.file.filename))
        .catch(err => res.status(422).json(err));
});

router.get('/all', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        res.json(files);
    });
})

router.get('/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        };

        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file._id);
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        };
    });
});

router.delete('/:filename', (req, res) => {
    gfs.remove({ filename: req.params.filename, root: 'uploads' }, (err, gfsStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.send('deleted!');
    })
});

module.exports = router;