import { CALL_API } from 'redux-api-middleware'

// constants
import itemActionsConstants from 'actions/item-actions/item-actions-constants'
const { FETCH_ITEMS_REQUEST, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_ERROR } = itemActionsConstants

// config
import config from 'config/config'

export function fetchItems() {

    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/items`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types: [
                FETCH_ITEMS_REQUEST,
                FETCH_ITEMS_SUCCESS,
                FETCH_ITEMS_ERROR
            ],
        }
    }
}

