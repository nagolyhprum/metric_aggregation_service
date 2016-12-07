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
  it("post errors on success as well", done => {
    const test = "dne";
    const metrics = new Metics(testFulfiller({error : test}));
    metrics.post().then(_ => _, error => {
      expect(error).to.be.equal(test);
      done();
    });
  });
  it("get errors on success as well", done => {
    const test = "dne";
    const metrics = new Metics(testFulfiller({error : test}));
    metrics.get().then(_ => _, error => {
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
