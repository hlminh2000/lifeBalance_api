const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const resolvers = require("./resolvers/index.js");

const schema = `
scalar JSON

type ActivityLog {
  id: String,
  activityId: String,
  timestamp: Int,
  start: Int,
  end: Int
}

type ActivityData {
  id: String
  icon: String
  title: String
  createdAt: Int
  isActive: Boolean
  isArchived: Boolean
}

type UserData {
  uid: String!
  name: String
  activities(activityIds: [String]): [ActivityData]
  activitiesLogs(dates: [String] activityIds: [String]): [ActivityLog]
}

# the schema allows the following query:
type Query {
  user(idToken: String!): UserData
}

# this schema allows the following mutation:
type Mutation {
  something: String
}
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers
});
