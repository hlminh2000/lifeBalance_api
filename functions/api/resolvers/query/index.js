const types = require("../types/index.js");
const verifyIdToken = require("../../services/auth.js").verifyIdToken;
const getPathSnapshotValue = require("../../services/database.js")
  .getPathSnapshotValue;

module.exports = {
  user: (_, { idToken }) => {
    console.log("idToken: ", idToken);
    return new Promise((resolve, reject) =>
      verifyIdToken(idToken)
        .then(
          uid =>
            new Promise(resolve => {
              return getPathSnapshotValue(`users/${uid.uid}`).then(userData =>
                resolve({
                  userData,
                  uid
                })
              );
            })
        )
        .then(({ uid, userData: { activities = [], activityLogs = {} } }) =>
          resolve({
            uid: uid.uid,
            name: uid.name,
            allActivityIds: activities.map(({ id }) => id),
            allActiveDates: Object.keys(activityLogs),
            metadata: uid,
            activities: ({ activityIds = activities.map(({ id }) => id) }) =>
              activityIds.map(activityId =>
                types.ActivityData(
                  { userId: uid.uid, activityId },
                  { cachedSet: activities }
                )
              ),
            activityLogs: ({
              dates = Object.keys(activityLogs) || [],
              activityIds = activities.map(({ id }) => id)
            }) =>
              Promise.all(
                dates
                  .map(date =>
                    activityIds.map(activityId =>
                      types.ActivityLog(
                        { userId: uid.uid, date, activityId },
                        { cachedSet: activityLogs[date] || [] }
                      )
                    )
                  )
                  .reduce((acc, activities) => acc.concat(activities), [])
              ).then(result => result.filter(activity => activity))
          })
        )
        .catch(err => resolve(null))
    );
  }
};
