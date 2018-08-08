import React from 'react';

import { SET_UPLOAD_IMAGE, REMOVE_UPLOAD_IMAGES } from '../actions/upload-actions/upload-actions';

const initialState = {
    images: {}
};

export default function (state = initialState, action) {

    const { payload, type } = action;

    switch (type) {
        case SET_UPLOAD_IMAGE:
            return {
                images: {
                    ...state.images,
                    [payload.id]: payload
                }
            }
    }

    switch (type) {
        case REMOVE_UPLOAD_IMAGES:
            return {
                images: {}
            }
    }

    return state
}