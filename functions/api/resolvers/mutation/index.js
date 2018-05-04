const types = require("../types/index.js");
const verifyIdToken = require("../../services/auth.js").verifyIdToken;
const getPathSnapshotValue = require("../../services/database.js")
  .getPathSnapshotValue;
const putValueToPath = require("../../services/database.js").putValueToPath;

module.exports = {
  something: (_, { idToken }) => {
    return idToken;
  },
  updateUserActivities: (_, { idToken, activityData, clientTimestamp } = {}) =>
    new Promise((resolve, reject) =>
      verifyIdToken(idToken)
        .then(({ uid }) => {
          putValueToPath(`users/${uid}/clientTimestamp`, clientTimestamp);
          return putValueToPath(`users/${uid}/activities`, activityData)
            .then(() => getPathSnapshotValue(`users/${uid}/activities`))
            .then(activities => resolve(activities));
        })
        .catch(err => resolve(null))
    ),
  updateUserActivityLogs: (
    _,
    { idToken, activityLogs, date, clientTimestamp } = {}
  ) =>
    new Promise((resolve, reject) =>
      verifyIdToken(idToken)
        .then(({ uid }) => {
          putValueToPath(`users/${uid}/clientTimestamp`, clientTimestamp);
          return putValueToPath(
            `users/${uid}/activityLogs/${date}`,
            activityLogs
          )
            .then(() =>
              getPathSnapshotValue(`users/${uid}/activityLogs/${date}`)
            )
            .then(activityLogs => resolve(activityLogs));
        })
        .catch(err => resolve(null))
    )
};
