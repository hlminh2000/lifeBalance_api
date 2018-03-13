const database = require("../../services/database");
const types = require("../types/index.js");

module.exports = {
  user: (_, { uid, session }) => {
    return {
      uid: uid,
      name: "JOHN",
      activities: ({activityIds = []}) => activityIds.map(
          activityId => types.ActivityData({ userId: uid, activityId })
        ),
      activitiesLogs: ({dates, activityIds}) => dates
        .map(date => activityIds.map(activityId => types.ActivityLog({
          userId: uid, date, activityId
        })))
        .reduce((acc, activities) => acc.concat(activities), [])
    };
  }
};