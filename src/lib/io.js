import { Server } from 'socket.io'

import { server } from './http.js'

const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 120000
  }
})

io.on('connection', async (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('chat message', async (msg) => {
    const username = socket.handshake.auth.username ?? 'anonymous'
    console.log({ username })
  })

  if (!socket.recovered) {
    console.log('Connection recovered')
  }
})
