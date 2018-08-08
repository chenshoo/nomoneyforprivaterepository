import React from 'react';

import { TOGGLE_SIDEBAR } from '../actions/sidebar-actions/sidebar-actions';

import helpers from 'helpers/helpers'
const initialState = !helpers.isMobile();

export default function (state = initialState, action) {

    const { payload, type } = action;

    switch (type) {
        case TOGGLE_SIDEBAR:
            return payload
    }

    return state
}