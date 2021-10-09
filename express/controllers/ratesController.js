const { isValidObjectId, Mongoose } = require('mongoose');
const Rate = require('../models/rates');
const mongodb=require('mongodb')
let ObjectID=mongodb.ObjectID;
class RatesController {

    getAll(req, res, next) {
        Rate.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        Rate.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }
    async getavg(req, res, next) {
        let { id } = req.params;

  Rate.aggregate([
    {
      '$match': {
        'recievedRate':ObjectID(id)
      }
    }, {
      '$group': {
        '_id': '$recievedRate', 
        'count': {
          '$avg': '$rate'
        }
      }
    }
  ],(err, response) => {
                if (err) return next(err);
                res.status(200).send(response);
            })
        

        // res.status(200).send(response);

        // Rate.aggregate([
        //     {
        //         $group: {
        //             'recievedRate': id,
        //             averageRate: { $avg: "$rate" },

        //         }
        //     }
        // ], (err, response) => {
        //     if (err) return next(err);
        //     res.status(200).send(response);
        // })
    }

    checkIfRated(req, res, next) {
        let { recievedRate, rateOffered } = req.params;
        Rate.find({ $and: [{ "recievedRate": recievedRate }, { "rateOffered": rateOffered }] }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    post(req, res, next) {
        let body = req.body;
        let rate = new Rate(body);
        rate.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Rate.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Rate.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

}

const ratesController = new RatesController();
module.exports = ratesController;