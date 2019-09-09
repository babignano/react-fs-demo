"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, LocalGraphQLDataSource } = require("@apollo/gateway");
const { buildFederatedSchema } = require("@apollo/federation");
const firebaseAdmin = require('./services/firebase-admin.js');
// Nodes
const tasks = require('./tasks');
const user = require('./user');
const NODE_ENV = process.env.NODE_ENV || 'dev';
const gateway = new ApolloGateway({
    localServiceList: [tasks, user],
    buildService: (service) => {
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
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        const idToken = req.headers.authorization;
        // get the user token from the headers
        try {
            const decodedToken = yield firebaseAdmin.auth().verifyIdToken(idToken);
        }
        catch (e) {
            // throw new AuthenticationError('Please log in');
        }
        // try to retrieve a user with the token
        // const user = getUser(decodedToken);
        // add the user to the context
        return { user };
    }),
    playground: NODE_ENV !== 'production',
    introspection: NODE_ENV !== 'production'
});
apolloServer.applyMiddleware({ app });
module.exports = { app, apolloServer };
