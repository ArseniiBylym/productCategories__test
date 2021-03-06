const {Schema, model} = require('mongoose');

const recipeChema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    imageUrl: {type: String, required: false},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true, autoIndex: true},
}, {
    timestamps: true
})

module.exports = model('Recipe', recipeChema)