import _ from 'lodash';
import development from './development';
import production from './production';
const isProduction = (ENV === 'production');

const config = {
}

const envConfig = isProduction ? production : development;

export default _.assign(config, envConfig);