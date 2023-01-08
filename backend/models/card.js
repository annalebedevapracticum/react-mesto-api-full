const mongoose = require('mongoose');
const { urlRegex } = require('../helpers/utils');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => urlRegex.test(link),
      message: 'Неккоректная ссылка',
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

});

module.exports = mongoose.model('card', cardSchema);
