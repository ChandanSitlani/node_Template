var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
ejs = require('ejs'),
LocalStrategy = require("passport-local"),
app = express(),
passport = require('passport'),
expressSessions = require('express-sessions');

mongoose.connect("mongodb://127.0.0.1:27017/assignment");


var db=mongoose.connection;
var User=require('./models/user');


app.use(require('express-session')({
    secret: "Assignment",
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',function(req,res){
	res.render('index');
});


app.get('/login',function(req,res){
	res.render('login');
});


app.get('/register',function(req,res){
	res.render('register');
});


app.post('/register',function(req,res){
	User.register(new User({'name':req.body.name,'username':req.body.username,'role':req.body.role}),req.body.password,function(err){
		if(err)
			console.log(err);
		else{
			passport.authenticate("local")(req,res,function()
			{
				if(req.user.role=='student')
				res.render('questions');
				else
					res.render('add');
			});
	}}
	);
});


app.post('/login',passport.authenticate("local",{failureRedirect:'/login'}),function(req,res)	{
	
			passport.authenticate("local")(req,res,function()
			{
				if(req.user.role=='student')
				res.render('questions');
				else
					res.render('add');
			});
		
});


			



app.listen(3000,function(err)
{
	console.log("listening on 3000");
});




