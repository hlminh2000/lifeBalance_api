const database = require("../../services/database");
const types = require("../types/index.js");

module.exports = {
  user: (_, { uid, session }) => {
    return {
      uid: uid,
      name: "JOHN",
      activities: types.ActivityData({ userId: uid }),
      activitiesLog: [types.ActivityLog({ userId: uid, dates: [] }, {})]
    };
  }
};
