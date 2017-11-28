const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true})
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const auth = admin.auth();

const app = express();

// This works
app.get('/test', (req, res) => res.send('Test works'));

// This failes with redential implementation provided to initializeApp() via the "credential" property has insufficient permission to access the requested resource
app.get('/test2', (req, res) => {
    auth.getUserByEmail('hans@bob.dk')
    .then((result) => console.log(result) )
    .catch(err => console.log(err) )
});

exports.app = functions.https.onRequest(app);
