module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('room', (data) => {
      socket.join(data.room)
    })

    socket.on('leave room', (data) => {
      socket.leave(data.room)
    })

    socket.on('coding event', (data) => {
      socket.broadcast.to(data.room).emit('receive code', data)
    })
  })
}
