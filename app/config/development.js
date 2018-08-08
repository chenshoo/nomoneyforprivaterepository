export default {

    apiBaseUrl: 'http://www.memeking.co.il/api',

    services : {
        analytics: {
            isOn : false
        },
        sentry: {
            isOn: false
        }
    },

    admin: {
        isOn: true,
    },

    features: {
        memeSuggestions: false,
        saveUserMemeToStorage: true,
        showPreviewModal: true,
    }



}