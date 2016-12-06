export const ADD_CLIENT = "ADD_CLIENT";
export const ADD_ERROR = "ADD_ERROR";
export const ADD_CLICK = "ADD_CLICK";
export const ADD_LATENCY = "ADD_LATENCY";
export const ADD_DISK = "ADD_DISK";

export const addClient = value => ({
  type : ADD_CLIENT
});

export const addError = client => ({
  type : ADD_ERROR,
  client
});

export const addClick = client => ({
  type : ADD_CLICK,
  client
});

export const addLatency = (client, value) => ({
  type : ADD_LATENCY,
  client,
  value
});

export const addDisk = (client, value) => ({
  type : ADD_DISK,
  client,
  value
});
