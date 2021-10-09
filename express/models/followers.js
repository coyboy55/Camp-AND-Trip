const { Schema, model } = require('mongoose');

const followersSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
}, {
    collection: 'followers'
});

const Followers = model('Followers', followersSchema);
module.exports = Followers;