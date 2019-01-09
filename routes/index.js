/*
* GET home page.
*/
 
exports.stindex = function(req, res){
    var message = '';
  res.render('stlogin',{message: message});
 
};
exports.inindex = function(req, res){
    var message = '';
  res.render('inlogin',{message: message});
 
};