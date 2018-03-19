const types = require("../types/index.js");
const verifyIdToken = require("../../services/auth.js").verifyIdToken;
const getPathSnapshotValue = require("../../services/database.js")
  .getPathSnapshotValue;

module.exports = {
  something: (_, { idToken }) => {
    return idToken;
  },
  updateUserActivities: (_, { idToken, activityData } = {}) =>
    new Promise((resolve, reject) =>
      verifyIdToken(idToken)
        .then(() => resolve([]))
        .catch(err => resolve(null))
    ),
  updateUserActivityLogs: (_, { idToken, activityLogs, date } = {}) =>
    new Promise((resolve, reject) =>
      verifyIdToken(idToken)
        .then(() => resolve([]))
        .catch(err => resolve(null))
    )
};
