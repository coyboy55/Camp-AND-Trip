const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,

        lowercase: true,
        trim: true,
        maxLength: 100,
    
    },
    password: {
        type: String,
   
     
        trim: true,
        maxLength: 100,
    
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        maxLength: 50,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        maxLength: 20
    },
    firstName: {
        type: String,
        trim: true,
        maxLength: 20
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 20
    },
    age: {
        type: Number,
        trim: true,
        maxLength: 20
    },
     token: {
        type: String
    
    },
    photo:{
        type: String,
        default:null
    },
  rate:{
type:Number
  },
    isTeam: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'user'
});

const User = model('user', userSchema);
module.exports = User;