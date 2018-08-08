/**
 * Created by nirbenya on 26/01/2018.
 */
const _  = require('lodash');

module.exports =  array => _.assign({}, ..._.map(array, meme => {

    if(!meme) {
        return {}
    }

    return { [meme.id]: meme }
}))