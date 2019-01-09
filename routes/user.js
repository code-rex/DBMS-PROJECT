
//---------------------------------------------signup page call------------------------------------------------------
exports.stsignup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      
      var name= post.username;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.phone_number;
      var add=post.address;
      var email=post.email;
      
      var sql = "INSERT INTO `students`(`first_name`,`last_name`,`phone_number`,`address`,`username`,`email`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + add + "','" +name + "','" + email + "','" + pass + "')";
      console.log(sql);
      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('stsignup.ejs',{message: message});
      });

   } else {
      res.render('stsignup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.stlogin = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
     
      var sql="SELECT  student_id,first_name, last_name, username,email,phone_number FROM `students` WHERE `username`='"+name+"' and password = '"+pass+"'"; 
      db.query(sql, function(err, results){
          
         if(results.length){
            req.session.userId = results[0].student_id;
            req.session.user = results[0];
            //console.log(req.session.userId);
            //res.redirect('/students/profile');
            res.redirect("/courses");
         }
         else{
            message = 'Wrong Credentials.';
            res.render('stlogin.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('stlogin.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.stdashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.stlogout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.stprofile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
       res.redirect("/students/login");
      return 0;
   }
   var sql="SELECT * FROM `students` WHERE `student_id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('stprofile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.steditprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return ;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};


//============INSTRUCTOR===============

exports.insignup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      
      var name= post.username;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.phone_number;
      var add=post.address;
      var email=post.email;
      
      var sql = "INSERT INTO `instructors`(`first_name`,`last_name`,`phone_number`,`address`,`username`,`email`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + add + "','" +name + "','" + email + "','" + pass + "')";
      console.log(sql);
      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('insignup.ejs',{message: message});
      });

   } else {
      res.render('insignup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.inlogin = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      var pass= post.password;
     
      var sql="SELECT  instructor_id,first_name, last_name,phone_number,email,username FROM `instructors` WHERE `username`='"+name+"' and password = '"+pass+"'"; 
      console.log(sql);
      db.query(sql, function(err, results){
          
         if(results.length){
            req.session.userId = results[0].instructor_id;
            req.session.user = results[0];
            //console.log(results[0].instrcutor_id);
            //res.redirect('/instructors/profile');
            res.redirect("/courses");
         }
         else{
            message = 'Wrong Credentials.';
            res.render('inlogin.ejs',{message: message});
         }
                 
      });
     } 
   else {
      res.render('inlogin.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.indashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `instrcutors` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.inlogout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/instructors/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.inprofile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/instructors/login");
      return 0;
   }
   var sql="SELECT * FROM `instructors` WHERE `instructor_id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('inprofile.ejs',{data:result});
   });
};
//islogged in condition
exports.inisprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return ;
   }
};