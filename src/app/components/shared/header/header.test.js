import React from 'react';
import configureStore from 'redux-mock-store'
import Header from './header.js';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


const mockStore = configureStore([])

describe('Header', () => {
    test('should match snapshot', () => {
        const component = renderer.create(
            <Provider store={mockStore()}>
                <Router>
                    <Header />
                </Router>
            </Provider>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('should display user email when in state', () => {

    });
});
