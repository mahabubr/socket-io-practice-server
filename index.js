const express = require('express')
const app = express()
const http = require('http')
const port = process.env.PORT || 5000

const cors = require('cors')
app.use(cors())

const httpServer = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});



io.on('connection', (socket) => {
    console.log('new user connected to our system');

    socket.on('disconnect', (socket) => {
        console.log('user disconnected to our system');
    })

    socket.on('joinRoom', data => {
        socket.join(data)
    })

    socket.on('reactEvent', (data) => {
        // socket.broadcast.emit('showMessage', data)
        socket.to(data.room).emit('showMessage', data)
    })

    // socket.on('testEvent', (data) => {
    //     console.log(data);
    // })

    // io.sockets.emit("fifaWorldCup", "Hello FootBall")

    // socket.send('FIFA World Cup 2022')
})

// let fifa = io.of('/worldCup')
// fifa.on('connection', (socket) => {
//     fifa.emit('worldCupEvent', "Hello fifa i am here")
// })

// let cricket = io.of('/cricketCup')
// cricket.on('connection', (socket) => {
//     cricket.emit('cricketCupEvent', "Hello ICC i am here")
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.html')
})

httpServer.listen(port, () => console.log(`server running on PORT ${port}`))