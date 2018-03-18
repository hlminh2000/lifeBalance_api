const admin = require("./firebase.js");

module.exports = {
  verifyIdToken: idToken =>
    new Promise((resolve, reject) =>
      admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedToken => resolve(decodedToken))
        .catch(err => reject({ err }))
    )
};
