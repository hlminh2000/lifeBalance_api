const types = require("../types/index.js");
const verifyIdToken = require('../../services/auth.js').verifyIdToken
const getPathSnapshotValue = require('../../services/database.js').getPathSnapshotValue

module.exports = {
  user: (_, { idToken }) => {
    return new Promise(
      (resolve, reject) => 
        // verifyIdToken(idToken)
        Promise.resolve({
          uid: "wUl1x1Vi0mYfF33Qh0gYPj6SGcc2",
          name: "Minh",
        })
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
              activities = [],
              activityLogs = {}
            }
          }) => resolve({
            uid: uid.uid,
            name: uid.name,
            metadata: uid,
            activities: ({
              activityIds = (activities.map(({id}) => id))
            }) => activityIds
              .map(
                activityId => types.ActivityData(
                  { userId: uid.uid, activityId }, 
                  { cachedSet: activities }
                )
              ),
            activityLogs: ({
              dates = (Object.keys(activityLogs) || []), 
              activityIds = (activities.map(({id}) => id))
            }) => dates
              .map(
                date => activityIds.map(activityId => types.ActivityLog(
                  { userId: uid.uid, date, activityId },
                  { cachedSet: activityLogs[date] || []}
                ))
              )
              .reduce((acc, activities) => activities ? acc.concat(activities) : acc, []),
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