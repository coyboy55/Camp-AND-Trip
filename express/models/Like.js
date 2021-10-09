const { Schema, model } = require('mongoose');

const likeschema = new Schema({
        postId:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    collection: 'like'
});

const Like = model('Like', likeschema);
module.exports = Like;