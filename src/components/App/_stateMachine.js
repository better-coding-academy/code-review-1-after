const stateMachine = {
  default: {
    FORM_ERRORED: "formErrored",
    RESULTS_LOADED: "resultsLoaded"
  },
  formErrored: {
    ERROR_CLEARED: "default"
  },
  resultsLoaded: {
    RESULT_SELECTED: "default",
    RESULTS_LOADED: "resultsLoaded",
    SEARCH_CLEARED: "default"
  }
};

export const initialState = "default";

export default stateMachine;
