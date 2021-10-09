const Post = require('../models/Post');


class PostController {

    

    getAll(req, res, next) {
        var mysort = { date: -1 };
        Post.find({}).sort(mysort).populate('author', ['email','username','phoneNumber','rate','photo','firstName','lastName','age','email','rate']).exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
 
        let { id } = req.params;
        Post.findById(id, (err, response) => {
       
            if (err) return next(err);
            res.status(200).send(response);
        });
    }
    getByAuthor(req, res, next) {
        let { id } = req.params;
        
        Post.find({author:id}).populate('author',{'username':1,'phoneNumber':1}).exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }
    getByLocation(req, res, next) {
        let { location } = req.params;
        Post.find({"location":location}).populate('author', ['email','username','phoneNumber','rate','photo','firstName','lastName','age','email','rate']).exec((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }
   

    post(req, res, next) {
        let body = req.body;
    
        body['photo']=req.file && req.file.filename;
        let post = new Post(body);
        post.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response); 
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        Post.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    putEmptySeat(req, res, next) {
        let {id,seat}=req.params
        Post.findById(id, (err, cat) => {
           if (err) return next(err);
        
            cat.nbSeatsEmpty = cat.nbSeatsEmpty - seat;
        
            cat.save((err, updatedCat) => {
                if (err) return next(err);
                res.send('ok')
            });
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        
        Post.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

}

const postController = new PostController();
module.exports = postController;