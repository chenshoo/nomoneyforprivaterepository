import _ from 'lodash';
import { renderField, renderColoredRadio } from 'components/FormComponents/FormComponents';

export default {

    description: {
        name: 'description',
        component: renderField,
        type: 'textarea',
    },

    example: {
        name: 'example',
        component: renderField,
        type: 'textarea'

    },

    tags: {
        name: 'tags',
        component: renderField,
        type: 'input',
        parse: value => _.split(value, ',')
    },

    explanation: {
        name: 'explanation',
        component: renderField,
        type: 'textarea'
    },

}