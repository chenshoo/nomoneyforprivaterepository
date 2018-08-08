import actionsConstants from 'actions/search-actions/search-actions-constants';

const initialState = {
    isFetching: false,
    searchResults: []
};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){
        case actionsConstants.FETCH_SEARCH_RESULTS_REQUEST:
            return {
                searchResults: [],
                isFetching: true
            }
            break;

        case actionsConstants.FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                searchResults: payload,
                isFetching: false
            }
            break;


        case actionsConstants.FETCH_SEARCH_RESULTS_ERROR:
            return {
                searchResults: [],
                error: payload,
                isFetching: false
            }
            break;
        case actionsConstants.CLEAN_SEARCH_RESULTS:
            return {
                searchResults: [],
                isFetching: false
            }

        default:
            return state

    return initialState;



    }
}