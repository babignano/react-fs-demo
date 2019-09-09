import React from 'react';
import Task from './task';
import renderer from 'react-test-renderer';

describe('Task', () => {
    test('should match snapshot', () => {
        const component = renderer.create(<Task />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
