const http = require('http');
const path = require('path');
const express = require('express');


const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose= require('mongoose');

const usuario = "william"
const password = "WilliamMoreno0908"
const dbName = "PQR_DB"
const uri = `mongodb+srv://${usuario}:${password}@cluster0.pk4ij.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

// Static files
app.use(express.static(path.join(__dirname,'public')));

// Starting the server
server.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});
