import React from 'react';
import Tasks from './tasks';
import renderer from 'react-test-renderer';

describe('Tasks', () => {
    test('should match snapshot', () => {
        const component = renderer.create(<Tasks />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
