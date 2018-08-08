
// config
import config from 'config/config';

class Analytics{

    init() {
        this.isOn = config.services.analytics.isOn;
    }

    sendEvent(eventName, eventData){

        if(this.isOn) {
            const date = new Date();
            ga('send', {
                hitType: 'event',
                eventCategory: eventName,
                eventAction: `${eventData ? eventData + ',' : '' } ${date.getHours()}:${date.getMinutes()}` ,
                eventLabel: eventName
            });

        }

        console.log('<< GA >>', eventName , eventData || '', `Service is ${this.isOn ? 'ON' : 'OFF'}`)
    }

 };



export default new Analytics();