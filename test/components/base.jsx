import Base from "components/base";

//LOCAL
import { BehaviorSubject } from "rx";
import { createStore } from "redux"
import { combineReducers } from "redux-immutable";
import reducers from "reducers/index";
const initialState = Map();
const rootReducer = combineReducers(reducers);

//GLOBALS
import { Map, List } from "immutable";
import { expect } from "chai";
import React from "react";
import { render } from "enzyme";
const store = createStore(rootReducer, initialState);
const Value = input => new BehaviorSubject(input);

describe("Base", () => {
  it("should be empty", () => {
    const result = render(<Base store={store}/>);
    const divs = result.find("div > div");
    expect(divs[0].children[0].data).to.be.equal("Hello World");
    expect(divs[1].children).to.have.length(0);
  });
  it("should show hello world and 1", () => {
    const result = render(<Base
      store={store}
      index={Value("Hello World")}
      base={Value(1)}
    />);
    const divs = result.find("div > div");
    expect(divs[0].children[0].data).to.be.equal("1");
    expect(divs[1].children[0].data).to.be.equal("Hello World");
  });
});
