

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export function toggleSideBar(isSideBarVisible){

    return{
        type: TOGGLE_SIDEBAR,
        payload : isSideBarVisible
    }
}

