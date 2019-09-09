import { GraphQLRequestContext } from "apollo-server-types";

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { ApolloServer} = require('apollo-server-express');
const { ApolloGateway, LocalGraphQLDataSource } = require("@apollo/gateway");
const { buildFederatedSchema } = require("@apollo/federation");
const firebaseAdmin = require('./services/firebase-admin.js');

// Nodes
const tasks = require('./tasks');
const user = require('./user');

const NODE_ENV = process.env.NODE_ENV || 'dev';

const gateway = new ApolloGateway({
  localServiceList: [tasks, user],
  buildService: (service: any) => {
      return new LocalGraphQLDataSource(buildFederatedSchema([service]));
    },
});

/**
 * Create Express Server
 */

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Create Apollo GraphQL server.
 */

const apolloServer = new ApolloServer({
  gateway,

  // Apollo gateway does not support subscriptions 
  subscriptions: false,

  context: async({ req }) => {
    const idToken = req.headers.authorization;

    // get the user token from the headers
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken)
    } catch (e) {
      // throw new AuthenticationError('Please log in');
    } 
   
    // try to retrieve a user with the token
    // const user = getUser(decodedToken);
   
    // add the user to the context
    return { user };
  },

  playground: NODE_ENV !== 'production',
  introspection: NODE_ENV !== 'production'
});

apolloServer.applyMiddleware({ app });

module.exports = { app, apolloServer };
