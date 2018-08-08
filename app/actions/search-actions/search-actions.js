import _ from 'lodash';
import { CALL_API } from 'redux-api-middleware';

// constants
import searchActionsConstants from './search-actions-constants';
const { FETCH_SEARCH_RESULTS_REQUEST, FETCH_SEARCH_RESULTS_SUCCESS, FETCH_SEARCH_RESULTS_ERROR, CLEAN_SEARCH_RESULTS } = searchActionsConstants;

// config
import config from 'config/config';

export function fetchSearchResults(query) {
   return  {
       [CALL_API]: {
           endpoint: `${config.apiBaseUrl}/search?search=${_.toLower(query)}`,
           method: 'GET',
           types: [ FETCH_SEARCH_RESULTS_REQUEST, FETCH_SEARCH_RESULTS_SUCCESS, FETCH_SEARCH_RESULTS_ERROR ]
       }
   }
}

export function cleanSearchResults() {

    return  {
        type: CLEAN_SEARCH_RESULTS,
        payload: []
    }
}