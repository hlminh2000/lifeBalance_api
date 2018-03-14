const getPathSnapshotValue = require('../../services/database.js').getPathSnapshotValue

module.exports = {
  ActivityData: ({ userId, activityId }) => 
    getPathSnapshotValue(`${userId}/activities/${activityId}`)
      .then(value => value
        ? {
            id: activityId,
            icon: value.icon,
            title: value.title,
            createdAt: value.createdAt,
            isActive: value.isActive,
            isArchived: value.isArchived
          }
        : null
      ),
  ActivityLog: ({ userId, date, activityId }) => 
    getPathSnapshotValue(`${userId}/activityLogs/${date}`)
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
            end: log.end
          })
        )[0]
      )
};
