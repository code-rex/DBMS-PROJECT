//Back end with colt steel ,Amazon AWS cloud9 server
//Related stuff
stackshare.io
1)https://www.davidbaumgold.com for command line
       https://www.davidbaumgold.com/tutorials/command-line/
         ls 
         cd(cd <DIRECTORY NAME>)
            cd ..(for going upper directory)
         pwd
         mkdir
         touch for creating a new file
         rm for deleting file
         rm -rf for deleting directory(folders)
2)NodeJs
   # php vs Nodejs
   # ruby (.rb)(a lot comparison of NodeJS ruby Javascript)
   running a .js(JSnode) file in server side : node <filename>
   npm(node Package Manager) is the package manager for javascript
   # Installing and Using Packages
   		* use 'npm install' to install a package
   		* use 'require()' to include a package



3)Express Framework
   How it is different from packages or library?
   -> Inversion of control
   why are we using Express?
   (VISIT SITE AND READ GETTING STARTED)

   package.json?
   json->javascript object node 
   https://docs.nodejitsu.com/articles/getting-started/npm/what-is-the-file-package-json/ 
   it contains metadata of package 

   'npm init' to create a package.json file
   '--save ' to add dependencies in package.json
   (npm install express --save)
   USE the '--save' flag to install pacakge

4)Route Params 
   //route order matters

5) MoreExpress
    .ejs (dynamic web pages)
    <%= %>  //when wanted to display the content inside that
    <%  %>  //otherwise eg. logic if,else,while,curly braces

    for post request install bodyparser
    npm install body-parser --save
    and add these two lines
    var bodyparser=require("body-parser");

     app.use(bodyparser.urlencoded({extended: true}));
    


6)The pattern
   * make package.json file -> npm init
   * install ejs,express -> npm install ejs ,npm install express
   * make dependencies to .json package file -> npm install ejs --save ,npm install express --save

   * all the .ejs file reside in folder views and css file in folder public
   * the base stuff to include express
            var express=require("express");
            var app=express();
   * for removing .ejs extension from all get responds use -> app.set("view engine","ejs");

   * install body parser for getting input from form via POST request
      -> npm install body-parser
      -> npm install body-parser --save
      and include thes two lines
      -> var bodyparser=require("body-parser");
      -> app.use(bodyparser.urlencoded({extended: true})); 

   * to the last of the page for port and IP listen 
       app.listen(process.env.PORT,process.env.IP,function(){
       console.log("The YelpCamp Server has been started") ;
      });

   * for adding Header and footer partial of html(for a complete HTML Boilerplate)
      -->Make folder partial inside views folder 
      --> header.ejs and footer.ejs(include the upper common portion of header in header.ejs and below two lines in footer.ejs)
      --> include heder and footer to each ejs file
          for header <% include partials/header %>
          for footer <% include partials/footer %>

7)Adding Bootstrap for style Using bootstrap CDN
    https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css 
    in header.ejs below title using ->  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"> 

    * Style the campgrounds Page
         

8)MangoDB
   non-relational,flexible,js object
   *install
      $ mkdir data
      $ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
      $ chmod a+x mongod

   * run
      https://community.c9.io/t/how-to-setup-mongodb-in-aws-c9/22553/4
      mongod --bind_ip=$IP --dbpath=/home/ec2-user/data --nojournal

   * to check working
      ->hit mongo fro ongo shell
   
   *Our First Mongo Commands
      1)mongod
      2)mongo
      3)help
      4)show dbs
      5)use
      6)insert
      7)find
      8)update
      9)remove

      CRUD(CREATE READ UPDATE DELETE)

8)Mangoose
   is a package help us interact with mangodb but its not necessary
   ->npm install mongoose 
   ->npm install mongoose --save
   https://us-east-2.console.aws.amazon.com/cloud9/ide/7e4d29a321e94ac19bc73f5a6be176a7?# //AWS CLOUD 9 URL

9)Semantic UI
   framework for cs and javascript
   add cdn of semantic ui
   //NICE UI CHECK IT

8)PUT request
   HTML does not support put request hence,use method override
   -> npm install method-override --save
   ?_method=DELETE

9)Final Updates for blog app
   sanitizer
   ->npm install express-sanitizer --save

10)Authentication
   Passport
   passport local
   passport local mongoose
   ->npm install passport passport-local --save
   ->npm install passport passport-local-mongoose --save

   //till now(install express,mongoose,ejs,body-parser,passport-local,passport-local-mongoose,)
  