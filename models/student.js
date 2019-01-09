var mysql=require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});
var sql="CREATE TABLE students(id int auto_increment primary key,name varchar(255),phone_number int,address int,course varchar(255))";
con.query(sql,function(req,res){
    if(req)
    console.log(req);
    else
    console.log("Student schema Created");
})
module.exports=con;