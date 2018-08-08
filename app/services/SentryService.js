
import config from 'config/config';

class SentryService {

    init() {

        if (config.services.sentry.isOn) {
            Raven.config('https://cdc49c9d2b0c44f38b5b7911c8e58ddc@sentry.io/225081').install();
        }

    }
}

export default new SentryService();