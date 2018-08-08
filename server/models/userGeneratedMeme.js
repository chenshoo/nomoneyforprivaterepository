
const mongoose = require('mongoose');
const commonMemeSchema = require('./commonMemeSchema');

const userGeneratedMemeSchema = mongoose.Schema({
    ...commonMemeSchema,
    isMobile: { type: Boolean },
    isDesktop: { type: Boolean },
    isMobileApp: { type: Boolean },

});


const UserGeneratedMeme = mongoose.model('UserGeneratedMeme', userGeneratedMemeSchema)


module.exports = UserGeneratedMeme;