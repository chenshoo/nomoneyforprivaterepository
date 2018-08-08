import _ from 'lodash';
import collageConstants from 'actions/collage-actions/collage-actions-constants';
import helpers from 'helpers/helpers';

const initialState = {
    isCollageMode: false,
    memes: {},
    limit: helpers.isMobile() ? 3 : 4
};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){
        case collageConstants.SET_COLLAGE_STATE:
            return {
                ...state,
                memes: payload.isCollageMode ? state.memes : {},
                isCollageMode: payload.isCollageMode
            }
            break;

        case collageConstants.RESET_COLLAGE_MEMES:
            return {
                ...state,
                memes: {},
            }
            break;

        case collageConstants.ADD_OR_REMOVE_MEME_FROM_COLLAGE:

            const isMemeExistsInCollage = _.find(state.memes, { id: payload.meme.id })

            if ( isMemeExistsInCollage ) {

                const newMemes = _.omit(state.memes, payload.meme.id );

                return {
                    ...state,
                    memes: newMemes
                }
            }

            return {
                ...state,
                memes: {
                    ...state.memes,
                    [payload.meme.id] : payload.meme
                }
            }

            break;

        default:
            return state
    }
}