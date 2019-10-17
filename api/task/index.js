const { gql } = require('apollo-server');
const { find, filter, map } = require('lodash');
const models = require('../models');

const name = 'task';

const typeDefs = gql`
  type Task {
    _id: ID!
    title: String!
    description: String,
    completed: Boolean
  }
  type Query {
    task: [Task]
  }
  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task!
  }
`;

const resolvers = {
    Query: {
        task: async(parent, args, context, info) => {
          return await models.Task.find({});
        }
    },
    Mutation: {
      createTask: async(parent, { title, description }) => {
        const task = new models.Task({ title, description });
        await task.save();
      },
      updateTask: async(parent, { id, title, description, completed }) => {
      }
  },
};

module.exports = {
  name,
  resolvers,
  typeDefs
}
