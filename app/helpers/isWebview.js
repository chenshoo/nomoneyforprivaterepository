import getQueryVariable from './getQueryVariable';

export default () => getQueryVariable('origin') === 'mobile';