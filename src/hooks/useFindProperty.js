import React from 'react';

import { STATUS } from '../utils/status';
import { findPropertyByName } from '../services/property-service';

export const useFindProperty = () => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [status, setStatus] = React.useState(STATUS.NONE);

  const fetchProperty = React.useCallback(async (name) => {
    setStatus(STATUS.LOADING);

    try {
      const { data: res } = await findPropertyByName(name);
      setData(res.properties);
      setStatus(STATUS.SUCCESS);
    } catch (err) {
      setError(err);
      setStatus(STATUS.FAILURE);
    }
  }, []);

  return {
    data,
    error,
    isLoading: status,
    fetchProperty,
  };
};
