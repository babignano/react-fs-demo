var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { gql } = require('apollo-server');
const { db } = require('../db');
const { find, filter, map } = require('lodash');
const uuidv4 = require('uuid/v4');
const name = 'tasks';
const typeDefs = gql `
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
        tasks: (parent, args, context, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                const snapshot = yield db.ref('tasks').once('value');
                return map(snapshot.val(), (value, key) => {
                    return {
                        id: key,
                        title: value.Title,
                        description: value.Description,
                        completed: value.Completed
                    };
                });
            }
            catch (e) {
                throw new Error(e);
            }
        })
    },
    Mutation: {
        createTask: (parent, { title, description }) => __awaiter(this, void 0, void 0, function* () {
            const id = uuidv4();
            try {
                yield db.ref(`tasks/${id}`).set({
                    Title: title,
                    Description: description,
                    Completed: false
                });
            }
            catch (e) {
                throw new Error(e);
            }
            return {
                id, title, description, completed
            };
        }),
        updateTask: (parent, { id, title, description, completed }) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield db.ref(`tasks/${id}`).update({
                    Title: title,
                    Description: description,
                    Completed: completed
                });
            }
            catch (e) {
                throw new Error(e);
            }
            return {
                id, title, description, completed
            };
        }),
    },
};
module.exports = {
    name,
    resolvers,
    typeDefs
};
