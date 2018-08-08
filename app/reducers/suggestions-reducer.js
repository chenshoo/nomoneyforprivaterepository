import searchActionsConstants from 'actions/suggestions-actions/action-suggestions-constants';
const { FETCH_SUGGESTIONS_REQUEST, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_ERROR } = searchActionsConstants;

const initialState = {
    isFetching: false,
    memes: {},
    category: ''
};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){

        case FETCH_SUGGESTIONS_REQUEST:

            return {
                ...state,
                isFetching: true
            }
            break;

        case FETCH_SUGGESTIONS_SUCCESS:
            return {
                memes: payload,
                isFetching: false
            }
            break;


        case FETCH_SUGGESTIONS_ERROR:
            return {
                memes: {},
                error: payload,
                isFetching: false
            }
            break;

        default:
            return state

            return initialState;



    }
}