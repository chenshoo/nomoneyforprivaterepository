import { CALL_API } from 'redux-api-middleware';
import axios from 'axios';


// config
import config from 'config/config';

const SAVE_USER_MEME_SUCCESS = 'SAVE_USER_MEME_SUCCESS';

export function updateMemeRating(meme) {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/update-meme-rating`,
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: ['REQUEST', 'SUCCESS', 'FAILURE'],
            body: JSON.stringify(meme)
        }
    }
}


export function saveUserMemeToStorage(meme) {


    return  dispatch => {
        dispatch({ type: 'REQUEST' });
        return axios.post(`${config.apiBaseUrl}/save-user-meme`, meme).then(url => {
            return dispatch({ payload: url , type: 'SUCCESS'})
        })

    }
}