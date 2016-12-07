import configureMockStore from "redux-mock-store"
import { BehaviorSubject } from "rx";
import { createStore } from "redux";
import { Map, List } from "immutable";
import { expect } from "chai";
import React from "react";
import { mount } from "enzyme";

const MockStore = (state = Map()) => configureMockStore([])(state);
const Value = input => new BehaviorSubject(input);

import Metics from "utils/metrics";

const testFulfiller = value => input => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const output = typeof value === "function" ? value(input) : value;
      if(output instanceof Error) {
        reject(output);
      } else {
        resolve(output);
      }
    }, 10);
  });
};

describe("metrics", () => {
  it("can get", done => {
    const test = { a : "b" };
    const metrics = new Metics(testFulfiller({data:test}));
    metrics.get().then(data => {
      expect(data).to.be.equal(test);
      done();
    });
  });
  it("can post", done => {
    const test = { a : "b" };
    const metrics = new Metics(testFulfiller({data:test}));
    metrics.post().then(data => {
      expect(data).to.be.equal(test);
      done();
    });
  });
  it("handle rejection", done => {
    const test = new Error();
    const metrics = new Metics(testFulfiller(test));
    metrics.post().then(_ => _, error => {
      expect(error).to.be.equal(test);
    });
    metrics.post().then(_ => _, error => {
      expect(error).to.be.equal(test);
      done();
    });
  });
  it("errors on success as well", done => {
    const test = "dne";
    const metrics = new Metics(testFulfiller({error : test}));
    metrics.post().then(_ => _, error => {
      expect(error).to.be.equal(test);
      done();
    });
  });
  it("will queue posts", done => {
    const metrics = new Metics(testFulfiller(input => ({
      data : Array.from({
        length : input.length
      })
    })));
    metrics.post().then(data => {
      expect(metrics.locked).to.have.length(3);
      expect(metrics.metrics).to.have.length(0);
    });
    metrics.post().then(data => {
      expect(metrics.locked).to.have.length(2);
      expect(metrics.metrics).to.have.length(0);
    });;
    metrics.post().then(data => {
      expect(metrics.locked).to.have.length(1);
      expect(metrics.metrics).to.have.length(0);
    });;
    metrics.post().then(data => {
      expect(metrics.locked).to.have.length(0);
      expect(metrics.metrics).to.have.length(0);
      done();
    });
    expect(metrics.locked).to.have.length(4);
    expect(metrics.metrics).to.have.length(4);
  });
});

/*
import Base from "components/base";
import {
  setBaseValue
} from "actions/base";

describe("Base", () => {
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
*/
