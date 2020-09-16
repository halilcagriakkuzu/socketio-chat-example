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

    // birisi odaya girdiğinde xx Odaya girdi.
    // birisi odadan çıktığında xx Odadan çıktı.
    // birisi mesaj yazıyorsa , XX yazıyor... desin
    // front-end yapılabilir bootstrap ile
    // kaç kişi bağlı olduğu yazabilir (36) kişi şuan odada
        

    socket.emit('init-messages', (messages))

    socket.on('disconnect', () => {
        console.log("bağlandı koptu.")
    })

    socket.on('chat-message', (data) => {
        messages.push(data)
        socket.broadcast.emit('chat-message', (data))
    })
})