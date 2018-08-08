import React from 'react';

// constants
import itemActionsConstants from 'actions/item-actions/item-actions-constants'
const { FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE } = itemActionsConstants

import helpers from 'helpers/helpers';

const initialState = {
    items: [],
    isFetching: false,
};

export default function (state = initialState, action) {

    const { payload, type } = action;

    switch (type) {
        case FETCH_ITEMS_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case FETCH_ITEMS_SUCCESS:
            return {
                ...state,
                items: payload,
                isFetching: false,
            }
        case FETCH_ITEMS_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
    }

    return state
}