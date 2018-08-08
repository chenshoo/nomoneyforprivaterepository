import { CALL_API } from 'redux-api-middleware'

// actions
import { showNotification } from 'actions/notification-actions/notification-actions'

// constants
import actionsConstnats from './user-messages-actions-constants'

// config
import config from 'config/config'


export function sendMessageToAdmin(data) {

    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/save-user-report`,
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                actionsConstnats.POST_PERSONAL_MESSAGE_REQUEST,
                actionsConstnats.POST_PERSONAL_MESSAGE_SUCCESS,
                actionsConstnats.POST_PERSONAL_MESSAGE_FAILED
            ],
        }
    }
}


export function fetchUserMessages() {
    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/user-reports`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                actionsConstnats.FETCH_USER_MESSAGES_REQUEST,
                actionsConstnats.FETCH_USER_MESSAGES_SUCCESS,
                actionsConstnats.FETCH_USER_MESSAGES_FAILED
            ],
        }
    }
}


export function fetchSingleMessage(id) {

    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/user-reports?id=${id}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                'REQUEST',
                actionsConstnats.FETCH_SINGLE_MESSAGE,
                'FAILURE',
            ],
        }
    }
}

export function updateUserMessageLikes(message) {
    console.log(message)
    return {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/update-user-report`,
            method: 'PUT',
            body: JSON.stringify(message),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                actionsConstnats.UPDATE_USER_REPORT_REQUEST,
                actionsConstnats.UPDATE_USER_REPORT_SUCCESS,
                actionsConstnats.UPDATE_USER_REPORT_FAILED,
            ],
        }
    }

}