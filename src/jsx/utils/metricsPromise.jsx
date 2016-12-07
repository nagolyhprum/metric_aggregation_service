import axios from "axios";
export default function(method, data) {
  return axios[method]("/metric", data).then(config => config.data);
};
