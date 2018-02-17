const newUser = (userId, db) => {
  const usersCollection = db.ref(`users/${userId}`);
  return usersCollection.set({
    name: "something",
    activities: [],
    activitiesLog: {}
  });
};

module.exports = newUser;
