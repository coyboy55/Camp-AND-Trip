const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
    phone: {
        type: String,

        
    },
    nbrOfSeat: {
        type: Number ,  
        maxLength: 50,

    },
    accepted: {
        type: Boolean,
    
    },
    postName: {
        type: String,
    
    },
    name: {
        type:String
    },
 
    postId: {
        type: String
    }
    ,
    userId: {
        type: String
    }
}, {
    collection: 'reservation'
});

const Reservation = model('Reservation', reservationSchema);
module.exports = Reservation;