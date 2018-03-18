const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const resolvers = require("./resolvers/index.js");

const schema = `
scalar JSON
scalar ID

type ActivityLog {
  id: String,
  activityId: String,
  timestamp: Int,
  start: Int,
  end: Int,
  date: String,
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
  uid: ID!
  name: String
  activities(activityIds: [String]): [ActivityData]
  activityLogs(dates: [String] activityIds: [String]): [ActivityLog]
  metadata: JSON!
}

# the schema allows the following query:
type Query {
  user(idToken: ID!): UserData
}

# this schema allows the following mutation:
type Mutation {
  something(idToken: String!): String
  ${
    ""
    // updateUserActivities(
    //   idToken: String!
    //   activityData: [ActivityData]!
    // ): [ActivityData]
    // udateUserActivityLogs(
    //   idToken: String!
    //   activityLogs: [ActivityLog]!
    //   date: String!
    // ): [ActivityLog]
  }
}
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers
});
