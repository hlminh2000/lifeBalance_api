const databaseService = require('../../services/database.js')

module.exports = {
  ActivityData: ({ userId, activityId, activity = {} }) => {
    const { id, icon, title, createdAt, isActive, isArchived } = activity
    return {
      id: id || activityId,
      icon: icon || "some icon",
      title: title || "some title",
      createdAt: createdAt || 0,
      isActive: isActive || true,
      isArchived: isArchived || false
    }
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
