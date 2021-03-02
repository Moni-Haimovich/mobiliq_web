import Api from '../utils/api';

export const getProperties = () => Api.get('/properties');

export const findProperty = (name) => Api.get(`/properties/find?name=${name}`);
