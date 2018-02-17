const functions = require("firebase-functions");
const admin = require("firebase-admin");
const lambdas = require("./lambdas");

const api = require("./api");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.client_id}.firebaseio.com`
});

exports.api = functions.https.onRequest(api);
exports.newUser = functions.auth.user().onCreate(e => {
  return lambdas.newUser(e.data.uid, admin.database());
});
