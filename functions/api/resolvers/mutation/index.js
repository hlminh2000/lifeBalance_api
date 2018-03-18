module.exports = {
  something: (_, { idToken }) => {
    return idToken;
  }
  // updateUserActivities: (_, { idToken, activityData } = {}) => {
  //   console.log(idToken, activityData);
  //   return {};
  // },
  // udateUserActivityLogs: (_, { idToken, activityLogs, date } = {}) => {
  //   console.log(idToken, activityLogs, date);
  //   return {};
  // }
};
