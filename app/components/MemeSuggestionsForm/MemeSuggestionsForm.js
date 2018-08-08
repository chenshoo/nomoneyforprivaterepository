import React from 'react';

// services
import AnalyticsService from 'services/Analytics';


class MemeSuggestionsForm extends React.Component {

    componentDidMount() {
        AnalyticsService.sendEvent('visited user meme suggestions form');
    };


    render() {
        return (
            <div>
                <iframe src="http://imri-memes-features.000webhostapp.com/" style={{ overflow: 'hidden', height: '100vh', width: '100%' }} />
            </div>
        )
    }
}

export default MemeSuggestionsForm;