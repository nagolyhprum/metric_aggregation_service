import configureMockStore from "redux-mock-store"
import { BehaviorSubject } from "rx";
import { createStore } from "redux";
import { Map, List } from "immutable";
import { expect } from "chai";
import React from "react";
import { mount } from "enzyme";

const MockStore = (state = Map()) => configureMockStore([])(state);
const Value = input => new BehaviorSubject(input);

import Base from "components/base";
import {
  setBaseValue
} from "actions/base";

describe("Base", () => {
  it("should be empty", () => {
    const result = mount(<Base store={MockStore()}/>);
    const divs = result.find("div").at(0).children();
    expect(divs.at(0).text()).to.be.equal("");
    expect(divs.at(1).text()).to.be.equal("");
  });
  it("should show hello world and 1", () => {
    const result = mount(<Base
      store={MockStore()}
      base={Value("Goodbye World")}
      index={Value(1)}
    />);
    const divs = result.find("div").at(0).children();
    expect(divs.at(0).text()).to.be.equal("Goodbye World");
    expect(divs.at(1).text()).to.be.equal("1");
  });
  it("has a click event", () => {
    const store = MockStore();
    const result = mount(<Base store={store}/>);
    result.find("div").at(0).simulate("click");
    expect(store.getActions()).to.have.length(1);
    expect(store.getActions()[0]).to.be.deep.equal(setBaseValue(1));
  });
});
