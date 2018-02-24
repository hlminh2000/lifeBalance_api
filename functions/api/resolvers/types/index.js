module.exports = {
  ActivityData: ({ userId }) => {
    return [
      {
        id: "some Id",
        icon: "some icon",
        title: "some title",
        createdAt: 0,
        isActive: true,
        isArchived: false
      }
    ];
  },
  ActivityLog: ({ userId, dates }, { dates: customDates }) => {
    return {
      id: "some Id",
      activityId: "some activityId",
      timestamp: 0,
      start: 0,
      end: 0
    };
  }
};
