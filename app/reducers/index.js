import { combineReducers } from 'redux';

// reducers
import isSideBarOpen from './reducer_sidemenu';
import categoryReducer from './category-reducer';
import searchReducer from './search-reducer';
import userMessagesReducer from './user-messages-reducer';
import notificationReducer from './notifications-reducer';
import suggestionsReducer from './suggestions-reducer';
import collageReducer from './collage-reducer';
import uploadReducer from './upload-reducer';
import { reducer as formReducers } from 'redux-form';
import authReducer from './auth';
import itemsReducer from './items-reducer';

const rootReducer = combineReducers({
    isSideBarOpen: isSideBarOpen,
    category: categoryReducer,
    search: searchReducer,
    userMessages: userMessagesReducer,
    notifications: notificationReducer,
    suggestions: suggestionsReducer,
    collage: collageReducer,
    upload: uploadReducer,
    form: formReducers,
    auth: authReducer,
    items: itemsReducer,
});

export default rootReducer;
