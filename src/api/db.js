const firebaseAdmin = require('./services/firebase-admin.js');

module.exports = {db: firebaseAdmin.database()}