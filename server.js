const io = require('socket.io')(3000, {
    cors: {
        origin: ['*']
    }
})

io.on("connection", socket => {
    const apiKey = {"apiKey": "secretAPIKey"}
    const history = []
    socket.on('get_history', ()=>{
        if(history !== null){
            socket.emit('send_history', history)
        }
    })

    socket.on('send_message', (message, room)=>{
        history.push(message)
        if(room == ""){
            socket.broadcast.emit('receive_message', message)
            socket.emit('get_config', apiKey)
        }else{
            socket.to(room).emit('receive-message', message);
        }
    })

    socket.on('join_room', (room,callback) => {
        socket.join(room);
        callback(`Joined ${room}!`);
    })
})

