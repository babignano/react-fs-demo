const { gql } = require('apollo-server');
const { db } = require('../db');
const { find, filter, map } = require('lodash');
const uuidv4 = require('uuid/v4');

const name = 'tasks';
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String,
    completed: Boolean
  }
  type Query {
    tasks: [Task]
  }
  type Mutation {
    createTask(title: String!, description: String): Task!
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task!
  }
`;

const resolvers = {
    Query: {
        tasks: async(parent, args, context, info) => {
          try {
            const snapshot = await db.ref('tasks').once('value');
            return map(snapshot.val(), (value, key) => {
              return {
                id: key,
                title: value.Title,
                description: value.Description,
                completed: value.Completed
              }
            });
          } catch (e) {
            throw new Error(e);
          }
        }
    },
    Mutation: {
      createTask: async(parent, { title, description }) => {
        const id = uuidv4();
        try {
          await db.ref(`tasks/${id}`).set({
            Title: title,
            Description: description,
            Completed: false
          })
        } catch (e) {
          throw new Error(e);
        }
        return {
          id, title, description, completed
        }
      },
      updateTask: async(parent, { id, title, description, completed }) => {
        try {
          await db.ref(`tasks/${id}`).update({
            Title: title,
            Description: description,
            Completed: completed
          })
        } catch (e) {
          throw new Error(e);
        }
        return {
          id, title, description, completed
        }
      },
  },
};

module.exports = {
  name,
  resolvers,
  typeDefs
}
