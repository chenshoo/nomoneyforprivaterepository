
export const SET_UPLOAD_IMAGE = 'SET_UPLOAD_IMAGE';
export const REMOVE_UPLOAD_IMAGES = 'REMOVE_UPLOAD_IMAGES';


export const setUploadImage = (image) => {
    return {
        type: SET_UPLOAD_IMAGE,
        payload: image
    }

}

export const clearUploadedImages = () => {
    return {
        type: REMOVE_UPLOAD_IMAGES,
        payload: {}
    }

}