

import actionsConstants from 'actions/user-messages-actions/user-messages-actions-constants';

export default function(state={}, action){

    const { payload, type } = action;
    switch(type){
        case actionsConstants.POST_PERSONAL_MESSAGE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
            break;

        case actionsConstants.POST_PERSONAL_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
            break;


        case actionsConstants.POST_PERSONAL_MESSAGE_FAILED:
            return {
                ...state,
                isLoading: false
            }
            break;



        case actionsConstants.FETCH_USER_MESSAGES_REQUEST:
            return {
                ...state,
                isLoading: true
            }
            break;

        case actionsConstants.FETCH_USER_MESSAGES_SUCCESS:
            return {
                isLoading: false,
                messages: payload
            }
            break;

        case actionsConstants.FETCH_USER_MESSAGES_FAILED:
            return {
                ...state,
                isLoading: false,
            }
            break;

        case actionsConstants.UPDATE_USER_REPORT_SUCCESS:
            return {
                isLoading: false,
                messages: {
                    ...state.messages,
                    [payload.id]: payload
                }
            }
            break;



        default:
            return state

    }
}