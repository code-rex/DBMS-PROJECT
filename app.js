var express=require("express"),
    app=express(),
    mysql=require("mysql"),
    bodyparser=require("body-parser"),
    connection=require("express-myconnection"),
    routes = require('./routes'),
    http = require('http')
  , path = require('path');

var passport=require("passport"),
    cookieparser=require("cookie-parser"),
    session=require("express-session"),
    morgan = require('morgan'),
    flash=require("connect-flash"),
    user=require("./routes/user");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});
con.connect(function(err) {
  if (err) console.log(err);
  console.log("Connected! to Database");
});

global.db = con;
app.use(morgan('dev'));
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(bodyparser.json());
//app.set('views', __dirname + '/views');

//passport setup
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000000 }
 } )); // session secret
 app.use(function(req,res,next){
     res.locals.currentUser=req.session.userId;
     next();
 })
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//=============SCHEMA===================//
/*var sql="CREATE TABLE students(student_id int auto_increment primary key,first_name varchar(255),last_name varchar(255),phone_number varchar(255),address varchar(255))";
con.query(sql,function(req,res){
    if(req)
    console.log(req);
    else
    console.log("Students schema Created");
});
//Email,username and password column added
var sql="CREATE TABLE instructors(instructor_id int auto_increment primary key,first_name varchar(255),last_name varchar(255),phone_number varchar(255),address varchar(255))";
con.query(sql,function(req,res){
    if(req)
    console.log(req);
    else
    console.log("instructors schema Created");
});
// 1 course -> 1 instructor
//student can have many courses,instructor
//courses can have many students,instructor
//instructor can have many student,courses
var sql="CREATE TABLE courses(course_id int auto_increment primary key,course_name varchar(255),about varchar(255))";
con.query(sql,function(req,res){
    if(req)
    console.log(req);
    else
    console.log("courses schema Created");
});*/
//USE JOIN COMMAND TO JOINT OR LINK THE TABLE

//=============ROUTES===================//
app.get("/",function(req,res){
    res.render("home")
})
app.get("/home",function(req, res) {
    res.render("home")
})

//COURSES Added and removal when instrcutor is logged in 
app.get("/courses",function(req,res){
    con.query('SELECT * FROM courses',function(err,rows){
        if(err)
        console.log(err);
        else
        res.render("courses",{data:rows,currentUser:req.session.userId});
    });   
});


app.get("/courses/new",function(req,res){
    var islogged=req.session.userId;
    if(islogged&&islogged>1000)
    res.render("new");
    else{
    req.flash("error","You must Be logged in as Instructor First!!");
    res.render("inlogin.ejs",{message:req.flash("error")});
    }
});
app.post("/courses",function(req,res){
    var name=req.body.name;
    var about=req.body.description;
    var download=req.body.download;
    var sql="INSERT INTO courses (course_name,about,download) VALUES ( '" + name  + "','"  +  about + "','"+ download+ "')";
    console.log(sql);
    con.query(sql,function(err,res){
        if(err)
        console.log(err);
        else
        {
        console.log("1 record inserted in courses id:"+res.insertId);
        }
    })
    res.redirect("/courses");
})
//deleting a course (a record)
app.get("/courses/:id/delete",function(req,res){
    //console.log(req.params.id);
    var islogged=req.session.userId;
    if(islogged&islogged>1000)
    {
    con.query("DELETE FROM courses WHERE course_id=?",[req.params.id],function(err,res)
    {
        if(err)
        console.log(err);
        else{
        console.log("Succesfully Deleted");
        }
    });
    res.redirect("/courses");
    }
    else{
    req.flash("error","You must Be logged in First!!");
    res.render("inlogin.ejs",{message:req.flash("error")});
    }
})
//enrolling in course for a particular course
app.get("/courses/:id/enroll",function(req,res){
    //console.log(req.session.user);//for getting logged in student information 
    //console.log(req.params.id);
    var islogged=req.session.userId;
    if(islogged<1000){
   var sql="insert into studentcourses(course_id,student_id) VALUES ('"  +  req.params.id + "','"+ req.session.userId + "')";
   con.query(sql,function(err,res){
       if(err)
       console.log(err);
       else
       console.log("course added");
   });
   var name=req.session.user;
   console.log(name.username);
   req.flash("error","Course added to "+name+" Dashboard");
   res.redirect("/courses");
    }
    else{
    req.flash("error","You must Be logged in First!!");
    res.render("stlogin.ejs",{message:req.flash("error")});
    }
});
//=========================AUTH ROUTES======================================
app.get("/signup",function(req,res){
    res.render("signup");
})
app.get("/login",function(req,res){
    res.render("login");
})

//=================STUDENTS===============
app.get('/students/signup', user.stsignup);//call for signup page
app.post('/students/signup', user.stsignup);//call for signup post 
app.get('/students/login', routes.stindex);//call for login page
app.post('/students/login', user.stlogin);//call for login post
//app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/students/logout', user.stlogout);//call for logout
app.get('/students/profile',user.stprofile);//to render users profile

//===================INSTRUCTORS==========
app.get('/instructors/signup', user.insignup);//call for signup page
app.post('/instructors/signup', user.insignup);//call for signup post 
app.get('/instructors/login', routes.inindex);//call for login page
app.post('/instructors/login', user.inlogin);//call for login post
//app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/instructors/logout', user.inlogout);//call for logout
app.get('/instructors/profile',user.inprofile);//to render users profile

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server has been started") ;
});