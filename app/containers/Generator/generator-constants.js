import helpers from 'helpers/helpers';
import { getCanvasContainerWidth } from './generator-helpers';

const spaceToAddForDankFormatStyle = helpers.isMobile() ? 80 : 150;

export default {

    cleanSlate: {
        MOBILE_HEIGHT:  280,

    },

    formats: {
        'normalFormat': {

            image: {
                getWantedMaxHeight: () => helpers.isMobile() ? 290 : null,
                getWantedMaxWidth: () => getCanvasContainerWidth(),
                style: {
                    top:  0,
                    left: 0,
                    hoverCursor: "default",
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true,
                    lockUniScaling: true,
                    hasBorders: false,
                    selectable: true,
                }

            },

            board: {
                getHeight: image => image.height,
                getWidth: image => image.width,
            },

        },

        'dankFormat': {

            image: {
                getWantedMaxHeight: () => helpers.isMobile() ? 250 : null,
                getWantedMaxWidth: () => (getCanvasContainerWidth() - (helpers.isMobile() ? 100 : 120)),
                style: {
                    top: spaceToAddForDankFormatStyle - 15,
                    left: 10,
                    hoverCursor: "default",
                    lockMovementX: false,
                    lockMovementY: false,
                    lockScalingX: false,
                    lockScalingY: false,
                    lockUniScaling: false,
                    hasBorders: true,
                    selectable: true,
                }

            },

            board: {
                getHeight: image => image.height + spaceToAddForDankFormatStyle,
                getWidth: image => image.width + 25
            }
        }
    }


}