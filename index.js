require('dotenv').config()

const http = require('http')
const socket = require('socket.io')

const app = require('./src/app')

const server = http.createServer(app)
const io = new socket.Server(server)

io.on('connection', socket => {
	socket.on('create-room', async clientId => {
		await socket.join(clientId)
	})

	socket.on('recipe-response', data => {
		const { clientId } = data
		io.sockets.in(clientId).emit("recipe-state-response", data)
	})

	socket.on("recipe-request", data => {
		socket.broadcast.emit("recipe-request", data)
	})
})

server.listen(process.env.PORT || 3000, () => {
	console.log(new Date())
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
})