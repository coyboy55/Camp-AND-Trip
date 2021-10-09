const Reservation = require('../models/reservation');

class ReservationController {

    getAll(req, res, next) {
        Reservation.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        Reservation.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    getNotAccepted(req, res, next) {

        Reservation.find({"accepted":false}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }
    getAccepted(req, res, next) {
let {id}=req.params
        Reservation.find({"accepted":true,"postId":id}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    post(req, res, next) {
        let body = req.body;
        let reservation = new Reservation(body);
        reservation.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Reservation.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        Reservation.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

}

const reservationController = new ReservationController();
module.exports = reservationController;