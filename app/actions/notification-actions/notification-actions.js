
// constants
import actionsConstnats from './notification-actions-constants';

export function showNotification(data) {

    return {
        type: actionsConstnats.SHOW_NOTIFICATION,
        payload: data
    }
}

export function clearNotifications() {

    return {
        type: actionsConstnats.CLEAR_NOTIFICATIONS,
        payload: {}
    }
}