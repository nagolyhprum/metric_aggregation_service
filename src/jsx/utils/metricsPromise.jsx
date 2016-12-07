import axios from "axios";
export default function(method, data) {
  return axios.post("/metric/" + method, data).then(config => config.data);
};
