const { gql } = require('apollo-server');
const { find, filter } = require('lodash');
const models = require('../models');


const typeDefs = gql`
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
    createUser(firstName: String, lastName: String, email: String): User!
  }
`;

const resolvers = {
    Query: {
        user: async(parent, args, context, info) =>  models.User.find({})
    },
    Mutation: {
        updateUser: async (parent, { firstName, lastName, email }) => { },
        createUser: async (parent, { firstName, lastName, email }) => {
          const user = new models.User({ firstName, lastName, email });
          await user1.save();
        },
    },
};

module.exports = { typeDefs, resolvers }; 
