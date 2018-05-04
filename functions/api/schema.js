const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const resolvers = require("./resolvers/index.js");

const outputTypes = `
scalar JSON
scalar ID

type ActivityLog {
  id: ID!
  activityId: String
  timestamp: Float
  start: Float
  end: Float
  date: String
}

type ActivityData {
  id: ID!
  icon: String
  title: String
  createdAt: Float
  isActive: Boolean
  isArchived: Boolean
}

type UserData {
  uid: ID!
  name: String
  allActivityIds: [ID]
  allActiveDates: [String]
  activities(activityIds: [String]): [ActivityData]
  activityLogs(dates: [String] activityIds: [String]): [ActivityLog]
  clientTimestamp: Float!
  metadata: JSON!
}
`;

const inputTypes = `
input ActivityLogInput {
  id: ID!
  activityId: String!
  timestamp: Float!
  start: Float!
  end: Float!
  date: String!
}

input ActivityDataInput {
  id: ID!
  icon: String!
  title: String!
  createdAt: Float!
  isActive: Boolean!
  isArchived: Boolean!
}
`;

const rootSchema = `
# the schema allows the following query:
type Query {
  user(idToken: String!): UserData
}

# this schema allows the following mutation:
type Mutation {
  something(idToken: String!): String

  updateUserActivities(
    idToken: ID!
    clientTimestamp: Float!
    activityData: [ActivityDataInput]!
  ): [ActivityData]

  updateUserActivityLogs(
    idToken: ID!
    clientTimestamp: Float!
    activityLogs: [ActivityLogInput]!
    date: String!
  ): [ActivityLog]
}
`;

const schema = `
${outputTypes}
${inputTypes}
${rootSchema}
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers
});
