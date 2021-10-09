const { Schema, model } = require('mongoose');

const ratesSchema = new Schema({
    rate: {
        type: Number,


    
    },

    recievedRate: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    rateOffered: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }



   
}, {
    collection: 'rates'
});

const Rates = model('Rates', ratesSchema);
module.exports = Rates;