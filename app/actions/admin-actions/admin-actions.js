import { CALL_API } from 'redux-api-middleware'

// config
import config from 'config/config'

export function saveNewMeme({ meme }) {

    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/save-new-meme`,
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meme),
            types: [
                'REQUEST',
                'SUCCESS',
                'FAILURE',
            ],
        }
    }
}

export function saveEditedMeme({ meme }) {
    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/save-edited-meme`,
            method: 'PUT',
            body: JSON.stringify(meme),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                'REQUEST',
                'SUCCESS',
                'FAILURE',
            ],
        }
    }

}

export function deleteMeme({ id }) {

    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/delete-meme?id=${id}`,
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                'REQUEST',
                'SUCCESS',
                'FAILURE',

            ],
        }
    }
}

