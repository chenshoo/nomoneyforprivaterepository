const commonMemeSchema = {
    description: { type: String, default: '', text: true },
    name: { type: String, default: '' },
    tags: { type: Array, default: [] },
    id: { type: String, default: '', required: true },
    urlPath: { type: String, default: '', required: true },
    thumbPath: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    category: { type: String, default: 'general' },
    date: { type: Date, default: new Date() },
    locale: { type: String, default: '' },
    example: { type: String, default: '' },
};

module.exports = commonMemeSchema;