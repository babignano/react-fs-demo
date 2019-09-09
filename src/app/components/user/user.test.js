import React from 'react';
import User from './user';
import renderer from 'react-test-renderer';

describe('User', () => {
    test('should match snapshot', () => {
        const component = renderer.create(<User />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
