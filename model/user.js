const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Blog = require('./blog');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    myPosts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }],
    favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }]
});

// favourite blogs, your uploads


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

module.exports = User;
