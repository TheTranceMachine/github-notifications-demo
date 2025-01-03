
const initialState = {
  areRepositoriesLoading: false,
  haveRepositoriesError: false,
  repositories: [],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REPOSITORIES':
      return { ...state, areRepositoriesLoading: true };
    case 'GET_REPOSITORIES_ERROR':
      return {
        ...state,
        haveRepositoriesError: true,
        error: action.error,
        areRepositoriesLoading: false
      };
    case 'GET_REPOSITORIES_SUCCESS':
      return { ...state, repositories: action.repositories, areRepositoriesLoading: false };
    default:
      return { ...state };
  }
}

export default reducer;