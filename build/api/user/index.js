const { gql } = require('apollo-server');
const { find, filter } = require('lodash');
const typeDefs = gql `
  type User {
    firstName: String
    lastName: String,
    email: String
  }
  type Query {
    user: User
  }
  type Mutation {
    updateUser(firstName: String, lastName: String, email: String): User!
  }
`;
const resolvers = {
    Query: {
        user(parent, args, context, info) {
            // return find(authors, { id: args.id });
        }
    },
    Mutation: {
        updateUser: (parent, { firstName, lastName, email }) => {
            return {};
        },
    },
};
module.exports = { typeDefs, resolvers };
