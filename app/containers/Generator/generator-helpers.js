import _ from 'lodash';

//helpers
import helpers from'helpers/helpers';
import colors from 'constants/colors';

export const getCanvasContainerWidth = () => (_.get(document.querySelector('.generator__canvas-wrapper'), 'offsetWidth'));

export const addImageAsync = ({ image }) => {

    if (!image) {
        return new Promise(resolve => resolve());
    }

    return new Promise(resolve => {

        if (isDataURL(image) || _.includes(image, 'blob')) {

            fabric.Image.fromURL(image, (image) => {

                resolve(image);
                return;
            })
        }

        return getDataUri({ image }).then(dataUri => {
            fabric.Image.fromURL(dataUri, (image) => {

                resolve(image);

            })
        })
    })
}


export function getDataUri({ image }) {

    return new Promise(resolve => {

        const imageElement = new Image();

        imageElement.onload = function () {
            const canvas = document.createElement('canvas')
            canvas.width = this.naturalWidth // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0)
            resolve(canvas.toDataURL('image/png'))
        }
        imageElement.crossOrigin = ''
        imageElement.src = image + '?123';
    })
}

export function blobToString({ blob }) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(blob);
    })
}


export const createCollage = ({ collageMemes, canvas, callback, addWaterMark }) => {

    const commonImageProperties = {
        hoverCursor: "default",
        lockMovementX: false,
        lockMovementY: false,
        lockScalingX: false,
        lockScalingY: false,
        lockUniScaling: false,
        hasBorders: true,
        selectable: true,
    }

    canvas.backgroundColor = colors.WHITE;

    const imagesPromises = _.map(collageMemes, meme => addImageAsync({ image: meme.urlPath }));

    Promise.all(imagesPromises).then(images => {

        _.forEach(images, image => {

            if(canvas.height < 10) {

                image = helpers.modifyImageDimensions({ image, wantedMaxHeight: helpers.isMobile() ? 180 : 300,  });
                canvas.setWidth(image.width);
                canvas.setHeight(image.height);
                image.set({
                    top: 0,
                    ...commonImageProperties
                })
            } else {

                const currentCanvasHeight = canvas.height;
                image = helpers.modifyImageDimensions({ image, wantedMaxHeight: helpers.isMobile() ? 180 : 500, wantedMaxWidth: canvas.width });
                canvas.setHeight(_.parseInt(canvas.height) + _.parseInt(image.height));

                image.set({
                    top: _.parseInt(currentCanvasHeight),
                    ...commonImageProperties
                });

            }

            canvas.add(image);

            callback(canvas);
        })

        addWaterMark();

    });


}

export function isDataURL(string) {
    const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    return !!string.match(regex);
}

export function getDominantColorFromCanvas({ canvas } = {}) {

    let blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height ;
    width = canvas.width ;

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;

}

