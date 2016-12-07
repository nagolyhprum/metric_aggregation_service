export const ADD_CLIENT = "ADD_CLIENT";
import {
    named,
    data
} from "private/constants";
const {
  ERROR_METRIC,
  CLICK_METRIC
} = named;
const {
  LATENCY_METRIC,
  DISK_METRIC
} = data;

export const addClient = value => ({
  type : ADD_CLIENT
});

export const addError = client => ({
  type : ERROR_METRIC,
  client
});

export const addClick = client => ({
  type : CLICK_METRIC,
  client
});

export const addLatency = (client, value) => ({
  type : LATENCY_METRIC,
  client,
  value
});

export const addDisk = (client, value) => ({
  type : DISK_METRIC,
  client,
  value
});
