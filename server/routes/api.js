const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const User = require('../models/user');
const YouTube = require('youtube-node');

const db = "mongodb://faraharimanda:harimanda50@ds259768.mlab.com:59768/videoplayer";
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("Error "+err);
    }
});

router.get('/videos', function(req, res){
    console.log('get request all videos');
    Video.find({})
    .exec(function(err, videos){
        if(err){
            console.log("Error videos");
        }else{
            res.json(videos);
        }
    });
}); 

router.get('/videos/:id', function(req, res){
    console.log('get request single video');
    Video.findById(req.params.id)
    .exec(function(err, video){
        if(err){
            console.log("Error video");
        }else{
            res.json(video);
        }
    });
});

router.get('/search/:title', (req, res, next) =>{
	var youTube = new YouTube();
	youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');
	youTube.search(req.params.title, 10, function(error, result) {
    if (error) {
        console.log(error);
    }else{
        var jsonData = JSON.parse(JSON.stringify(result, null, 2));
        var videolist=[];
        for(var i=0;i<jsonData.items.length; i++){
            var newVideo = new Video();
            newVideo.title = jsonData.items[i].snippet.title;
            newVideo.url="https://www.youtube.com/embed/"+jsonData.items[i].id.videoId;
            newVideo.icone = jsonData.items[i].snippet.thumbnails.default.url;
            newVideo.id = jsonData.items[i].id.videoId;
            videolist.push(newVideo);
           
        }
        res.status(200).json(videolist);
    }
    });
});

router.post('/login', function(req, res){
    console.log('login.......');
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        email: email,
        password: password
    });
    User.findOne({email: email, password: password}, function(err, user){
        if(err){
            console.log('Error saving user');
        }
        if(user){
            res.json(user);
        }
        else{
            res.json('error');
        }
    });
});


router.post('/users', function(req, res){
    console.log('Post a user');
    var email = req.body.email;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var password = req.body.password;

    var compteur = 0;

    var newUser = new User({
        lastname: lastname,
        firstname: firstname,
        email: email,
        password: password
    });

    if( email == '' || lastname == '' || email == '' || password == ''){
        compteur = compteur + 1;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email_validate = re.test(String(email).toLowerCase());
    if(email_validate == false){
        compteur = compteur + 1;
    }

    User.findOne({email: email}, function(err, user){
        if(user){
            res.json('email_existant');
        }
        else{
            if(compteur == 0){
                newUser.save(function(err, insertUser){
                    if(err){
                        console.log('Error saving user');
                    }else{
                        console.log(insertUser);
                        res.json(insertUser);
                    }
                });
                //res.json('success');
            }
            else{
                res.json('error_invalide');
            }
            
        }
    });
});

module.exports = router;