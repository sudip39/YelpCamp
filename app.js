var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
// User = require("./models/user"),
seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", function(req, res){
   res.render("landing"); 
});
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, campgrounds){
       if(err){
           console.log(err);
       } else {
        res.render("campgrounds/index", {campgrounds: campgrounds});
       }
    });
});
app.post("/campgrounds", function(req, res){
    Campground.create(req.body.campground, function(err, a){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new"); 
});
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
            res.render("campgrounds/show", {campground: foundCampground}); 
       }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});
app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comm){
                if(err){
                    console.log(err);
                }else{
                    camp.comments.push(comm);
                    camp.save();
                    res.redirect("/campgrounds/"+camp._id);
                }
            });
        }
    });
});

app.listen(8080,"localhost", function(){
    console.log("The Yelpcamp server has Started!!!");
});
