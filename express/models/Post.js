const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,

        lowercase: true,
        maxLength: 100,
      
    },
    description: {
        type: String,
    
        maxLength: 50,
     
    },
    location: {
        type: String,
        maxLength: 20
    },
    nbSeats: {
        type:Number
    },
    nbSeatsEmpty: {
        type:Number
    },
    nbLikes: {
        type: Number
    }
    ,
    type: {
        type: String
    }
    ,
    date: {
        type: Date
    }
    ,
    photo: {
        type: String
    }
    ,
    nbLike: {
        type: Number
    }
    ,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {
    collection: 'post'
});

const Post = model('Post', postSchema);
module.exports = Post;