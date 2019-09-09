"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('./node_modules/apollo-server');
const { find, filter } = require('lodash');
const typeDefs = gql `
  type Task {
    title: String
    description: String
  }
`;
const resolvers = {
    Task: {
        task(parent, args, context, info) {
            // return find(authors, { id: args.id });
        },
    }
};
exports.default = {
    typeDefs,
    resolvers
};
