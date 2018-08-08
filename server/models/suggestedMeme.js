
const mongoose = require('mongoose');


const suggestedMemeSchema = mongoose.Schema({
    description: { type: String, default: '', text: true },
    explanation: { type: String, default: '' },
    urlPath: { type: String, default: '' },
    userName: { type: String, default: '' },
    email: { type: String, default: '' }
});


const SuggestedMeme = mongoose.model('SuggestedMeme', suggestedMemeSchema)

module.exports = SuggestedMeme;


