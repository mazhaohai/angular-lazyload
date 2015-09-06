var express = require("express");
var cons = require("consolidate");
var app=express();
var routes = require("./routes/index")(app);

app.use(express.static(__dirname+'/public'));
app.set('view engine','html');
app.engine('html',cons.underscore);
/*app.use("/",routes);*/
app.listen(1337);
console.log("port:"+1337);
