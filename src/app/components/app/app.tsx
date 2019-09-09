import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from '../../store';

import { Auth, AuthContext } from '../../services/auth.service';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Container from '@material-ui/core/Container';

import SignIn from '../auth/signin/signin';
import User from '../user/user';
import Tasks from '../tasks/tasks';
import Header from '../shared/header/header';

import './app.scss';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <Provider store={configureStore()}>
      <AuthContext.Provider value={new Auth()}>
       <ApolloProvider client={client}>
        <Router>
          <Header />
          <Container maxWidth="sm">
            <div>
              <Redirect from="/" exact to="/tasks" />
              <Route path="/signin" component={SignIn} />
              <Route path="/user" component={User} />
              <Route path="/tasks/:id?" component={Tasks} />
            </div>
          </Container>
        </Router>
        </ApolloProvider>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App
