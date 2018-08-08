import _ from 'lodash';
import actionsConstants from 'actions/category-actions/category-actions-constants';

const initialState = {
    memes: []
};

export default function(state=initialState, action){

    const { payload, type } = action;

    switch(type){

        case actionsConstants.FETCH_CATEGORY_REQUEST:
            return {
                memes: [],
                isFetching: true,
            }
            break;

        case actionsConstants.FETCH_CATEGORY_SUCCESS:
            return {
                memes: payload,
                isFetching: false,
            }
            break;


        case actionsConstants.FETCH_CATEGORY_FAILED:
            return {
                memes: [],
                error: payload,
                isFetching: false,
            }
            break;





        case actionsConstants.FETCH_MY_MEMES:
            return {
                isFetching: false,
                memes: payload,

            }
            break;





        case actionsConstants.FETCH_WEEKLY_POPULAR_REQUEST:
            return {
                isFetching: true,
                memes:[],
                name: "הפופולאריים השבוע",
            }
            break;

        case actionsConstants.FETCH_WEEKLY_POPULAR_SUCCESS:
            console.log('popular', payload)
            return {
                isFetching: false,
                memes: payload,
            }
            break;

        case actionsConstants.FETCH_WEEKLY_POPULAR_FAILED:
            return {
                isFetching: false,
                memes: [],
            }
            break;





        case actionsConstants.FETCH_NEW_MEMES_REQUEST:
            return {
                isFetching: true,
                memes: [],
            }
            break;

        case actionsConstants.FETCH_NEW_MEMES_SUCCESS:
            return {
                isFetching: false,
                memes: payload,
            }
            break;

        case actionsConstants.FETCH_NEW_MEMES_FAILED:
            return {
                isFetching: false,
                memes: [],
            }
            break;


        case actionsConstants.FETCH_ALL_TIME_POPULAR_MEMES_REQUEST:
            return {
                isFetching: true,
                memes: [],
            }
            break;

        case actionsConstants.FETCH_ALL_TIME_POPULAR_MEMES_SUCCESS:
            console.log(payload)
            return {
                isFetching: false,
                memes: payload,
            }
            break;

        case actionsConstants.FETCH_ALL_TIME_POPULAR_MEMES_FAILED:
            return {
                isFetching: false,
                memes: [],
            }
            break;




        case actionsConstants.FETCH_SINGLE_MEME_REQUEST:
            return {
                isFetching: false,
                memes: [],
            }
            break;


        case actionsConstants.FETCH_SINGLE_MEME_SUCCESS:

            const meme = _.head(payload);

            return {
                isFetching: false,
                memes: { ...state.memes, [meme.id] : meme },
            }
            break;

        case actionsConstants.FETCH_SINGLE_MEME_FAILED:
            return {
                isFetching: false,
                memes: []
            }
            break;

        case 'ADD_MEME_TO_CATEGORY':
            return {
                isFetching: false,
                memes: {
                    ...state.memes,
                    [payload.id]: {
                        ...payload,
                        hidden: true
                    }
                }
            }
            break;









        default:
            return state



    }
}