const types = require("../types/index.js");
const verifyIdToken = require("../../services/auth.js").verifyIdToken;
const getPathSnapshotValue = require("../../services/database.js")
  .getPathSnapshotValue;

module.exports = {
  something: (_, { idToken }) => {
    return idToken;
  },
  updateUserActivities: (_, { idToken, activityData } = {}) => {
    return [];
  },
  udateUserActivityLogs: (_, { idToken, activityLogs, date } = {}) => {
    console.log(idToken, activityLogs, date);
    return [];
  }
};
