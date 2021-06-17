import ErrorTypes from './errors.types';

const initialState = {
  errorExists: false,
  errorTitle: '',
  errorBody: '',
  errorSpinner: false,
  errorDismiss: false,
};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ErrorTypes.ERROR_DECLARATION:
      return {
        ...state,
        errorExists: true,
        errorTitle: action.payload.title,
        errorBody: action.payload.body,
        errorSpinner: action.payload.spinner,
        errorDismiss: action.payload.dismiss,
      };
    case ErrorTypes.ERROR_RESOLVED:
      return {
        ...state,
        errorExists: false,
        errorTitle: '',
        errorBody: '',
        errorSpinner: false,
        errorDismiss: false,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
