const users = [{ name: "John" }];

const resolveFunctions = {
  Query: {
    user(_, { uid, session }) {
      return {};
    }
  },
  Mutation: {
    something() {
      return "asf";
    }
  }
};

module.exports = resolveFunctions;
