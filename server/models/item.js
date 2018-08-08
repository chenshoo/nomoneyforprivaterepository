const mongoose = require('mongoose');


const item = mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    id: { type: String, default: '', required: true },
});

const Item = mongoose.model('Item', item);

module.exports = Item;