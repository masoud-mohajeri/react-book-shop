import ErrorTypes from './errors.types';

export const declareError = (error) => {
  return {
    type: ErrorTypes.ERROR_DECLARATION,
    payload: error,
  };
};

export const resolveError = () => {
  return {
    type: ErrorTypes.ERROR_RESOLVED,
  };
};
