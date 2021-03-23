import React from "react";

import { STATUS } from "../utils/status";
import { getProperties } from "../services/property-service";

export const useGetProperties = () => {
  const [properties, setProperties] = React.useState();
  const [status, setStatus] = React.useState(STATUS.NONE);
  const [error, setError] = React.useState();

  const fetchProperties = React.useCallback(async () => {
    setStatus(STATUS.LOADING);

    try {
      const { data: res } = await getProperties();
      setStatus(STATUS.SUCCESS);
      setProperties(res.properties);
    } catch (err) {
      setStatus(STATUS.FAILURE);
      setError(err);
    }
  }, []);

  return {
    properties,
    status,
    error,
    fetchProperties,
  };
};
