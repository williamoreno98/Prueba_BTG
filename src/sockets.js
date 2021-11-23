const chat= require('./models/chat');

module.exports = function(io){

    let nicknames = [];
    io.on('connection', async (socket) => {
        console.log('new user connected');
        
        let messages = await chat.find({});
        socket.emit('load old messages',messages);
        
        
        socket.on('new request', (data,cb) =>{
            cb(true)
            socket.nickname=data;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames',nicknames);
        });

        socket.on('send message', async data => {
            
            var newMsg= new chat({
                solicitud: data,
                mensaje: socket.nickname
            });
            await newMsg.save();
            
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        });
    });

}