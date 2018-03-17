const getPathSnapshotValue = require('../../services/database.js').getPathSnapshotValue

module.exports = {
  ActivityData: ({ userId, activityId } = {}, {cachedSet} = []) => 
    (
      cachedSet
      ? Promise.resolve(cachedSet)
      : getPathSnapshotValue(`users/${userId}/activities`)
    )
      .then((activities = []) => {
        const activity = activities.find(({id}) => id === activityId)
        return activity
        && {
            id: activityId,
            icon: activity.icon,
            title: activity.title,
            createdAt: activity.createdAt,
            isActive: activity.isActive,
            isArchived: activity.isArchived
          }
      }),
  ActivityLog: ({ userId, date, activityId } = {}, {cachedSet} = []) => 
    (
      cachedSet
      ? Promise.resolve(cachedSet)
      : getPathSnapshotValue(`users/${userId}/activityLogs/${date}`)
    )
      .then(activityLogs => (activityLogs || [])
        .filter(
          log => log.activityId === activityId
        )
        .map(
          log => ({
            id: log.id,
            activityId: log.activityId,
            timestamp: log.timestamp,
            start: log.start,
            end: log.end,
            date
          })
        )[0]
      )
};
