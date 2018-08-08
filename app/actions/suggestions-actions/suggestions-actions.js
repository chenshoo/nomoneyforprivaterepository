import { CALL_API } from 'redux-api-middleware';

// constants
import searchActionsConstants from './action-suggestions-constants';
const { FETCH_SUGGESTIONS_REQUEST, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_ERROR } = searchActionsConstants;

// helpers
import helpers from 'helpers/helpers';

// config
import config from 'config/config';

export function fetchMemeSuggestions(category,size) {
    return  {
        [CALL_API]: {
            endpoint: `${config.apiBaseUrl}/meme-suggestions?category=${category}&size=${helpers.isMobile() ? 3 : 6}`,
            method: 'GET',
            types: [ FETCH_SUGGESTIONS_REQUEST, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_ERROR ]
        }
    }
}
