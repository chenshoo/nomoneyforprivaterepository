import _ from 'lodash';
import helpers from 'helpers/helpers';

export default ({ image, wantedMaxHeight, wantedMaxWidth }) => {
    const isMobile = helpers.isMobile();
    const containerWidth = (_.get(document.querySelector('.generator__canvas-wrapper'), 'offsetWidth'));
    let maxWidth = wantedMaxWidth || (isMobile ? 300 : containerWidth);
    let maxHeight = wantedMaxHeight || (isMobile ? 350 : 500)
    let ratio = 0;  // Used for aspect ratio

    //handles the case of really small images - this will make the image in the size of the canvas.
    if(image.width < maxWidth){
        let ratio = maxWidth / image.width;
        image.width  = maxWidth;
        image.height = image.height  * ratio;
    }
    // Check if the current width is larger than the max

    if (image.width > maxWidth) {
        ratio = maxWidth / image.width;   // get ratio for scaling image
        image.width = maxWidth; // Set new width
        image.height = image.height * ratio; // Scale height based on ratio
    }

    // Check if current height is larger than max
    if (image.height > maxHeight) {
        ratio = maxHeight / image.height; // get ratio for scaling image
        image.height = maxHeight  // Set new height
        image.width = image.width * ratio    // Scale width based on ratio

    }

    return image;
};
