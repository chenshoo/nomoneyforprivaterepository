import _ from 'lodash';
import { CALL_API } from 'redux-api-middleware';

// config
import config from 'config/config';

// constants
import dataActionConstants from './category-actions-constants';
import constants from 'constants/global';

export function fetchCategory(category) {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/category?category=${category}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_CATEGORY_REQUEST,
                dataActionConstants.FETCH_CATEGORY_SUCCESS,
                dataActionConstants.FETCH_CATEGORY_FAILED
            ],
        }
    }
}

export function fetchMyMemes() {
    return (dispatch, getState) => {
        const state = getState();
        const personalMemes = _.get(state, 'auth.user.personalMemes');

        return dispatch({
            type: dataActionConstants.FETCH_CATEGORY_SUCCESS,
            payload: personalMemes
        })
    }
}

export function addMemeToCategory(meme) {
    return {
        type: 'ADD_MEME_TO_CATEGORY',
        payload: meme
    }
}

export function fetchSingleMeme(id) {
    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/single-meme?id=${id}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_SINGLE_MEME_REQUEST,
                dataActionConstants.FETCH_SINGLE_MEME_SUCCESS,
                dataActionConstants.FETCH_SINGLE_MEME_FAILED
            ],
        }
    }

}

export function fetchWeeklyPopularMemes() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/get-weekly-popular-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_WEEKLY_POPULAR_REQUEST,
                dataActionConstants.FETCH_WEEKLY_POPULAR_SUCCESS,
                dataActionConstants.FETCH_WEEKLY_POPULAR_FAILED
            ],
        }
    }
};

export function fetchNewMemes() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/new-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_NEW_MEMES_REQUEST,
                dataActionConstants.FETCH_NEW_MEMES_SUCCESS,
                dataActionConstants.FETCH_NEW_MEMES_FAILED
            ],
        }
    }
};


export function fetchAllTimePopularMemes() {
    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/all-time-popular-memes`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                dataActionConstants.FETCH_ALL_TIME_POPULAR_MEMES_REQUEST,
                dataActionConstants.FETCH_ALL_TIME_POPULAR_MEMES_SUCCESS,
                dataActionConstants.FETCH_ALL_TIME_POPULAR_MEMES_FAILED
            ],
        }
    }
}
