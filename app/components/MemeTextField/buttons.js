
import colors from 'constants/colors';

export default {
    alignTextLeft: {
        action: 'alignTextLeft',
        icon: 'ALIGN_LEFT',
        text: '',
        className : 'text-left'
    },

    alignCenter: {
        action : 'alignTextCenter',
        icon: "ALIGN_CENTER",
        text : '',
        className: 'text-right'
    },

    alignTextRight: {
        action: 'alignTextRight',
        icon : 'ALIGN_RIGHT',
        className: 'text-right'
    },

    remove: {
        action: 'remove',
        icon: 'TRASH'
    },

    makeFontSmaller : {
        action: 'makeFontSmaller',
        text: '-'
    },

    makeFontLarger: {
        action: 'makeFontLarger',
        text: '+'
    },

    makeFontLight: {
        action: 'makeFontLight',
        text: 'a'
    },

    makeFontBold: {
        action: 'makeFontBold',
        text: 'a',
        className: 'bold'
    },

    toggleTextColor: {
        action: 'toggleTextColor',
        icon : 'TEXT_COLOR',
        activeClassName: 'black'
    }
}
