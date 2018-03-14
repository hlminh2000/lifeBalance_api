const types = require("../types/index.js");
const verifyIdToken = require('../../services/auth.js').verifyIdToken


module.exports = {
  user: (_, { idToken }) => {
    return new Promise((resolve, reject) => verifyIdToken(idToken)
      .then(uid => resolve({
        uid: uid,
        name: "JOHN",
        activities: ({activityIds = []}) => activityIds
          .map(
            activityId => types.ActivityData({ userId: uid, activityId })
          ),
        activitiesLogs: ({dates, activityIds}) => dates
          .map(date => activityIds.map(activityId => types.ActivityLog({
            userId: uid, date, activityId
          })))
          .reduce((acc, activities) => acc.concat(activities), [])
      }))
      .catch(err => resolve(null)))
  }
};