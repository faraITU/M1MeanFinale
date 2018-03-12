const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

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

module.exports = router;