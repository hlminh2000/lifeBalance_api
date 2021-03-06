const admin = require("./firebase.js");

module.exports = {
  getPathSnapshotValue: path =>
    new Promise(resolve =>
      admin
        .database()
        .ref(path)
        .once("value", snapshot => resolve(snapshot.val()))
    ),
  putValueToPath: (path, value) =>
    admin
      .database()
      .ref(path)
      .set(value)
};
