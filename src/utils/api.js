import axios from "axios";

import config from "../config/config.json";

const Api = axios.create({
  baseURL: config.api,
});

export default Api;
