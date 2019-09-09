import React from 'react';
import SignIn from './signin.js';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

const mockStore = configureStore([])

describe('SignIn', () => {
    test('should match snapshot', () => {
        const component = renderer.create(
            <Provider store={mockStore()}>
                <SignIn />
            </Provider>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
