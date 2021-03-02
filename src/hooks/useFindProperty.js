import React from 'react';

import { findProperty } from '../services/property-service';

export const useFindProperty = () => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchProperty = React.useCallback(async (name) => {
    setIsLoading(true);

    try {
      const { data: res } = await findProperty(name);
      setData(res.properties);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    isLoading,
    fetchProperty,
  };
};
