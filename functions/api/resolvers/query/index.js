const types = require("../types/index.js");
const verifyIdToken = require('../../services/auth.js').verifyIdToken
const getPathSnapshotValue = require('../../services/database.js').getPathSnapshotValue

module.exports = {
  user: (_, { idToken }) => {
    return new Promise(
      (resolve, reject) => verifyIdToken(idToken)
        .then(
          uid => new Promise(resolve => {
            return getPathSnapshotValue(`users/${uid.uid}`)
              .then(userData => resolve({
                userData,
                uid
              }))
          })
        )
        .then(
          ({
            uid,
            userData: {
              activities,
              activityLogs
            }
          }) => resolve({
            uid: uid.uid,
            name: uid.name,
            activities: ({activityIds = []}) => activityIds
              .map(
                activityId => types.ActivityData(
                  { userId: uid.uid, activityId }, 
                  { cachedActivities: activities }
                )
              ),
            activitiesLogs: ({dates=[], activityIds=[]}) => dates
              .map(date => activityIds.map(activityId => types.ActivityLog(
                { userId: uid.uid, date, activityId },
                { cachedActivityLogs: activityLogs}
              )))
              .reduce((acc, activities) => acc.concat(activities), []),
          })
        )
        .catch(err => resolve(null))
        
        // .then(uid => resolve({
        //   uid: uid.uid,
        //   name: uid.name,
        //   activities: ({activityIds = []}) => activityIds
        //     .map(
        //       activityId => types.ActivityData({ userId: uid.uid, activityId })
        //     ),
        //   activitiesLogs: ({dates=[], activityIds=[]}) => dates
        //     .map(date => activityIds.map(activityId => types.ActivityLog({
        //       userId: uid.uid, date, activityId
        //     })))
        //     .reduce((acc, activities) => acc.concat(activities), [])
        // }))
        // .catch(err => resolve(null))
    )
  }
};