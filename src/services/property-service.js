import Api from "../utils/api";

export const getProperties = () => Api.get("/properties");

export const findPropertyByName = (name) =>
  Api.get(`/properties/find?name=${name}`);
