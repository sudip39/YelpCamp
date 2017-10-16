var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin mauris lectus, vel laoreet elit fringilla vitae. Praesent tempus laoreet enim vitae dignissim. Suspendisse tempus, tellus id tincidunt ultrices, diam enim feugiat enim, non vehicula justo turpis ut risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eget ligula faucibus, suscipit felis at, feugiat turpis. Aliquam erat volutpat. Suspendisse condimentum hendrerit dui non dapibus. Morbi dui enim, vestibulum eu elementum quis, sodales ut nisl. Fusce commodo velit erat, et pellentesque ante venenatis vitae. Duis pretium dignissim metus. In venenatis metus nulla, quis vehicula tellus egestas sit amet."
    },
    {
        name: "Desert Mesa",
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin mauris lectus, vel laoreet elit fringilla vitae. Praesent tempus laoreet enim vitae dignissim. Suspendisse tempus, tellus id tincidunt ultrices, diam enim feugiat enim, non vehicula justo turpis ut risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eget ligula faucibus, suscipit felis at, feugiat turpis. Aliquam erat volutpat. Suspendisse condimentum hendrerit dui non dapibus. Morbi dui enim, vestibulum eu elementum quis, sodales ut nisl. Fusce commodo velit erat, et pellentesque ante venenatis vitae. Duis pretium dignissim metus. In venenatis metus nulla, quis vehicula tellus egestas sit amet."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sollicitudin mauris lectus, vel laoreet elit fringilla vitae. Praesent tempus laoreet enim vitae dignissim. Suspendisse tempus, tellus id tincidunt ultrices, diam enim feugiat enim, non vehicula justo turpis ut risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla eget ligula faucibus, suscipit felis at, feugiat turpis. Aliquam erat volutpat. Suspendisse condimentum hendrerit dui non dapibus. Morbi dui enim, vestibulum eu elementum quis, sodales ut nisl. Fusce commodo velit erat, et pellentesque ante venenatis vitae. Duis pretium dignissim metus. In venenatis metus nulla, quis vehicula tellus egestas sit amet."
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("removed campgrounds");
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        var comment = {
                            text: "This place is Great.I Wish there was an Internet.",
                            author: "Holmer"
                        }
                        Comment.create(comment, function (err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                data.comments.push(comment);
                                data.save();
                                console.log("Created new comment");
                            }
                        });
                    }
                });
            });
        }
    });
}
module.exports = seedDB ;