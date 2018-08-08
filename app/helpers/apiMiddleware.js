import _ from 'lodash'
import { CALL_API } from 'redux-api-middleware'

// config
import config from 'config/config'


export default (options = {}) => {

    const defaultTypes = [
        'REQUEST',
        'SUCCESS',
        'FAILURE'
    ];

    const types = options.types || defaultTypes;

    return {
        [CALL_API]: {
            ...options,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            types,
        }

    }
}