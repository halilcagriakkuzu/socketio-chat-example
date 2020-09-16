const express = require('express')()
const http = require('http').Server(express)
const io = require('socket.io')(http)

// Server Logic
http.listen(3000)

express.get('/', (req, res) => {
    res.sendFile(__dirname + '/client.html')
})

var messages = []

// Socket Logic
io.on('connection', (socket) => {

    socket.emit('init-messages', (messages))

    socket.on('disconnect', () => {
        console.log("bağlandı koptu.")
    })

    socket.on('chat-message', (data) => {
        messages.push(data)
        socket.broadcast.emit('chat-message', (data))
    })
})