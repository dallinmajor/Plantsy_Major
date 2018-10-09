const mongoose = require('mongoose');


const mongoURI = process.env.MONGODB_URI || 'mongodb://dallinmajor:Pin4Dallin@ds151382.mlab.com:51382/mytestbd';
const conn = mongoose.createConnection(mongoURI, (err, db) => {
    if (err) {
        console.log('err', err);

    }
    else { console.log('Connected')}
});

module.exports = {
    conn: conn,
    mongoURI: mongoURI
}