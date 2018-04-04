var http = require('http');
var url = require('url');
var fs = require('fs');
var express = require('express');
var app = express();

// Класс Router позволяет определить маршрут, в пределах которого можно создавать подмаршруты и задавать им обработчики
var router = express.Router();

router.get("/", function(req, res){
    // var path = url.parse(inUrl).pathname;

    path = 'public/index.html';

    fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            res.writeHead(404, { 'Content-Type' : 'text/plain'});
            res.end('Not Found!');
        }
        else{
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.write(data.toString());
            console.log('data was sent');
            res.end();
        }
    });
});

router.get("/:id", function(req, res){
        // res.send(`Product ${req.params.id}`);
        path = 'public/' + req.params.id;

        fs.readFile(path, function(err, data){
            if(err){
                console.log(err);
                res.writeHead(404, { 'Content-Type' : 'text/plain'});
                res.end('Not Found!');
            }
            else{
                res.writeHead(200, { 'Content-Type' : 'text/html'});
                res.write(data.toString());
                console.log('data was sent');
                res.end();
            }
        });
    });

// app.get("/", function(req, res){
//     res.send("Главная страница");
// });

app.use('/', router);

app.use('/static', express.static('public'));


app.listen(8081, function(){
    console.log('Server starting! on http://localhost:8081');
});

