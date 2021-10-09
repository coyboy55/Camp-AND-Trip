const Like = require('../models/Like');

class LikeController {

    getAll(req, res, next) {
        Like.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        Like.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    getnbLikes(req, res, next) {
        let { id } = req.params;
        Like.find({"postId":id}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }
    checkLiked(req, res, next) {
        let { id ,id1} = req.params;
        Like.find({"postId":id,"userId":id1}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    post(req, res, next) {
        let body = req.body;
        let user = new Like(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Like.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    getPost(req, res, next) {
   let {id}=req.params;
        Like.find({"userId":id}).populate("postId").exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }


    delete(req, res, next) {
        let { id } = req.params;
        Like.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }



    deleteLikeBypost(req, res, next) {
        let { id } = req.params;
        Like.deleteOne({ "userId": id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

}

const likeController = new LikeController();
module.exports = likeController;