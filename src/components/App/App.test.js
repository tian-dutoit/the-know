import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it.skip('should match snapshot', () => {
    const renderedComponent = shallow(<App />);

    expect(renderedComponent).toMatchSnapshot();
  })
})