import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {shallow} from 'enzyme';

describe('App',()=>{
  const component = shallow(<App />);
  
  it("render page heading", () => {
    let heading = component.find("[data-test-handle='page-heading']");
    expect(heading.text()).toEqual("Import CSV File!");
  });
})


