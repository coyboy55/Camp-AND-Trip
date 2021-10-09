const User = require('../models/User');
const fs=require('fs')
class UsersController {

    getAll(req, res, next) {
        User.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    get(req, res, next) {
        let { id } = req.params;
        User.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    post(req, res, next) {
        let body = req.body;
       
        let user = new User(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        User.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        });
    }

    putPhoto(req, res, next) {
        let { id } = req.params;
User.findById(id,(err,response)=>{
    if (err) return next(err);

    let photo=response.photo
    console.log(photo);
 if(photo){
let path='public/uploads/users/'+response.photo
fs.unlink(path, (err) => {
    if (err) {
        console.error(err)
        return
    }
 
});
let body = req.body;
 body['photo']=req.file && req.file.filename
 
 User.updateOne({ _id: id }, {
     $set: body
 }, (err, response) => {
     if (err) return next(err);
     res.status(200).send(response);
 });
 }else{
    let body = req.body;
    body['photo']=req.file && req.file.filename
    
    User.updateOne({ _id: id }, {
        $set: body
    }, (err, response) => {
        if (err) return next(err);
        res.status(200).send(response);
    });
 }

})

    }


    delete(req, res, next) {
        let { id } = req.params;
        User.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);
        })
    }

    deletePP(req, res, next) {
        let { id } = req.params;
        User.findById(id,(err,response)=>{
            if (err) return next(err);
    
            let photo=response.photo

         if(photo){
        let path='public/uploads/users/'+response.photo
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
            let body = req.body;
            body['photo']=null
            
            User.updateOne({ _id: id }, {
                $set: body
            }, (err, response) => {
                if (err) return next(err);
                res.status(200).send(response);
            });
        });
         }
        })
   
    }

}

const usersController = new UsersController();
module.exports = usersController;