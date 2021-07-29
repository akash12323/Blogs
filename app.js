
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}


const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
// const seedDB = require('./seed');
const flash = require('connect-flash');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user');

//Routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

// Initilising the passport and sessions for storing the users info
app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

app.use(blogRoutes);
app.use(authRoutes);
app.use(userRoutes);



const mongoose = require('mongoose');

mongoose.connect(`${process.env.DB_URL}`, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then(()=>{
    console.log("DB Connected");
})
.catch(err=>{
    console.log(err);
})


// seedDB();



app.listen(process.env.PORT || 3000,()=>{
    console.log('Server started on Port 3000');
})