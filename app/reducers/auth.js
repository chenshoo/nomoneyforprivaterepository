import _ from 'lodash';
// actions
import {
    AUTH_USER,
    UNAUTH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED, FETCH_USER_REQUEST,
    ADD_TO_FAVOURITES_REQUEST,
    ADD_TO_FAVOURITES_SUCCESS,
    ADD_TO_FAVOURITES_FAILED,
    REMOVE_PERSONAL_MEMES_SUCCESS,
    REMOVE_PERSONAL_MEMES_REQUEST,
    REMOVE_PERSONAL_MEMES_FAILED
} from 'actions/user-actions/user-actions-constants';

// services
import LocalStorage from 'services/LocalStorage';

// config
import config from 'config/config';
const initialState = {
    authenticated: false,
    user: {
        isAdmin:  _.get(config, 'admin.isOn')
    },
    personalMemes: {}
}

export default function (state = initialState, action) {

    const { payload, type } = action

    switch (type) {
        case AUTH_USER: {
            return {
                ...state,
                authenticated: true,
            }
            break
        }

        case UNAUTH_USER: {
            return {
                ...state,
                authenticated: false,
            }
            break
        }

        case FETCH_USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
            }
            break
        }

        case ADD_TO_FAVOURITES_REQUEST: {
            return {
                ...state,
                isFetching: true,
            }
            break
        }

        case ADD_TO_FAVOURITES_SUCCESS: {

            return {
                ...state,
                isFetching: false,
                user: {
                    ...state.user,
                    personalMemes: payload
                }
            }
            break
        }

        case ADD_TO_FAVOURITES_FAILED: {
            return {
                ...state,
                isFetching: true,
            }
            break
        }

        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                user: payload,
            }
            break
        }

        case FETCH_USER_FAILED: {
            return {
                ...state,
                isFetching: false
            }
            break
        }

        case REMOVE_PERSONAL_MEMES_REQUEST: {
            return {
                ...state,
                isFetching: true,
            }
            break
        }

    }

    return state
}