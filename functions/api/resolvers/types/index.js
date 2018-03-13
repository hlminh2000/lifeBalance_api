const databaseService = require('../../services/database.js')

module.exports = {
  ActivityData: ({ userId, activityId }) => {
    return new Promise((resolve, reject) => databaseService
      .ref(`${userId}/activities/${activityId}`)
      .once("value", snapShot => {
        const value = snapShot.val()
        console.log("activityId: ", activityId)
        resolve(value ? {
          id: activityId,
          icon: value.icon,
          title: value.title,
          createdAt: value.createdAt,
          isActive: value.isActive,
          isArchived: value.isArchived
        }:{})
      }))
  },
  ActivityLog: ({ userId, date, activityId }) => {
    return {
      id: "some Id",
      activityId: activityId,
      timestamp: 0,
      start: 0,
      end: 0
    }
  }
};
