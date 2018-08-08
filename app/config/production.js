export default {

    apiBaseUrl: '/api',

    services : {
        analytics: {
            isOn : true
        },
        sentry: {
            isOn: true
        }
    },

    admin: {
        isOn: false,
    },

    features: {
        memeSuggestions: false,
        saveUserMemeToStorage: true,
        showPreviewModal: true,
    }

}