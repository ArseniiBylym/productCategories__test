const {Schema, model} = require('mongoose');

const categoryChema = new Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'User', default: null},
}, {
    timestamps: true
})

module.exports = model('Category', categoryChema)