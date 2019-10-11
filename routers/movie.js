var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {       // edited to solve task 7
        Movie.find({})
        .populate('actors')
        .exec(function (err, movie) {
            if (err) return res.json(err);
            if (!movie) return res.json();

            res.json(movie);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    //task 1
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },

    //task 4
    removeActorFromMovies: function(req, res) {       
               
        Movie.findOne({_id: req.params.idMovie}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.params.idActor}, function(err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json(err);
                var actorIndex = 0;
                for(var i = 0; i < movie.actors.length; i++){
                    if (movie.actors[i] == req.params.idMovie){
                        actorIndex = i;
                    }
                }
                movie.actors.splice(actorIndex,1);
                movie.save(function(err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    //task 5
    addActor: function(req, res) {          
        Movie.findOne({_id: req.params.id}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: req.body.id}, function(err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json(err);
                movie.actors.push(actor._id);
                movie.save(function(err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },

    //task 6
    filterBetween: function(req, res) { 
        Movie.find({year : {$lt: parseInt(req.body.year1) , $gt: parseInt(req.body.year2)}}).exec( function(err , rep){
            res.json(rep);
        });
        // Movie.find({}).where('year').gte(req.params.year2).and.lte(req.params.year1).exec(function(err, rep){
        //     res.json(rep);
        // });
    }

    ,

    deleteMovieLte: function (req,res) {
        Movie.deleteMany( { year: { $lt: req.params.year } } ).exec(
         function (err,rep) {
             res.json(rep);
         }
        )
        
    }
}