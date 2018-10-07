const mongoose = require('mongoose');


const mongoURI = 'mongodb://plantsy:Pin4Plantsy@ds151382.mlab.com:51382/plantsy';
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