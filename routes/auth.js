module.exports=function(app,passport){
    //BASE
    app.get("/signup",function(req,res){
        res.render("signup");
    })
    app.get("/login",function(req,res){
        res.render("login");
    })
    
    //===========SIGNUP================
    
    //==========STUDENT================
    //show the sstudent signup form
    app.get("/students/signup",function(req,res){
        res.render("stsignup.ejs",{message:req.flash("signupMessage")})
    })
    //process the student signup form
    app.post("/students/signup",passport.authenticate("local-signup",{
        successRedirect:"/students/profile",
        failureRedirect:"/students/signup",
        failureFlash:true 
    }),
    function(req, res) {
      console.log("hello from student signup");  
    });
    
    //profile section
    app.get("/students/profile",isloggedin,function(req,res){
        res.render("stprofile.ejs",{
            user: req.user
        });
    });
    
    //===========Instructor===============
    //show the sstudent ignup form
    app.get("/instructors/signup",function(req,res){
        res.render("insignup.ejs",{message:req.flash("signupMessage")})
    })
    //process the student signup form
    app.post("/instructors/signup",passport.authenticate("local-signup",{
        successRedirect:"/instructors/profile",
        failureRedirect:"/instructors/signup",
        failureFlash:true 
    }));
    //profile section
    app.get("/instructors/profile",isloggedin,function(req,res){
        res.render("inprofile.ejs",{
            user: req.user
        });
    });
    
    //LOGIN
    //STUDENTS
    app.get('/students/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('stlogin.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/students/login', passport.authenticate('local-login', {
            successRedirect : '/students/profile', // redirect to the secure profile section
            failureRedirect : '/students/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("login successful");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });
    
    //INSTRUCTORS
    app.get('/instructors/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('inlogin.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/instructors/login', passport.authenticate('local-login', {
            successRedirect : '/instructors/profile', // redirect to the secure profile section
            failureRedirect : '/instructors/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("login successful");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    
    
    //LOGOUT
    app.get('/students/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.get('/instructors/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
}
//middleware
function isloggedin(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}