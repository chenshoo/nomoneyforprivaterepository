import _ from 'lodash';

export function required(value) {
    if (!value || (!_.isNumber(value) && !_.size(value))) {
        return 'Required';
    }
}