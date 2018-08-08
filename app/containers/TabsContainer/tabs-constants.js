
export default {

    home: {
        label: 'ראשי',
        icon : 'HOME',
        to: '/',
        isVisible: () => true

    },

    search: {
        label: 'חיפוש',
        icon : 'SEARCH',
        to: '/search',
        isVisible: () => true

    },

    categories: {
        label: 'קטגוריות',
        icon : 'LIST',
        to: '/categories',
        isVisible: () => true

    },

    popular: {
        label: ' פופולאריים',
        icon : 'TROPHY',
        to: '/memes/popular',
        isVisible: () => true
    },

    new: {
        label: ' חדשים',
        icon : 'IMAGES',
        to: '/memes/new-memes',
        isVisible: () => true

    },

    myMemes: {
        label: 'ממים שלי',
        icon : 'USER',
        to: '/memes/my-memes',
        isVisible: ({ isLoggedIn }) => isLoggedIn

    },

    settings: {
        label: 'הגדרות',
        icon : 'COG',
        to: '/settings',
        isVisible: ({ isLoggedIn }) => isLoggedIn

    },






}