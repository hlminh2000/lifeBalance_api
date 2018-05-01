const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

const intialized = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  },
  "app"
);

module.exports = intialized;
