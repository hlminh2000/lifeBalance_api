const database = require("../../services/database");

module.exports = {
  user: (_, { uid, session }) => {
    return {
      uid: uid,
      name: "JOHN"
    };
  }
};
