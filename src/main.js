import express from 'express';
import http from 'http';
var app = express();
var server = http.createServer(app);
const filePath = "./data.json";

app.use(express.static(process.cwd() + '/src'));

app.get('/', async function(req,res){
  const page = '/src/index.html';
  res.sendFile(process.cwd() + page);
});

server.listen(process.env.PORT || 3000);





