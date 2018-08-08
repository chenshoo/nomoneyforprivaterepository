
import helpers from 'helpers/helpers';
export const shadow = helpers.isMobile() ? 'black 2px 2px 5px' : 'black 2px 2px 10px';

export default {

     fillStyle : {
        "fill": "#fff",
        "borderColor": "blue",
        "cornerColor": "blue",
        "transparentCorners": false,
        "cornerSize": 8,
        editable: false,
        fontFamily: "impacta_oebold, impact",
        lineHeight: 1,
        fontSize : '20',
        strokeWidth : '0',
        textAlign : 'center',
         shadow:  shadow,
     },


    strokeStyle : {
        strokeLineJoin: "round",
        stroke: "#000",
        hasControls: false,
        hasBorders: false,
        selectable: false,
        editable: false,
        fontFamily: "impacta_oebold, impact",
        lineHeight: 1,
        strokeWidth :'1',
        fontSize : '20',
        fill: "#000",
        textAlign : 'center',
        shadow:  shadow
    }
}