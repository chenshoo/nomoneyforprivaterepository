

import actionsConstants from 'actions/notification-actions/notification-actions-constants';

const initialState = {};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){
        case actionsConstants.SHOW_NOTIFICATION:
            return payload
            break;

        case actionsConstants.CLEAR_NOTIFICATIONS:
            return {}
            break;

        default:
            return state
    }
}