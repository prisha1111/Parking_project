const connectedUsers = new Map();

const handleVoiceCall = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Register user
        socket.on('register-user', ({ userId }) => {
            connectedUsers.set(socket.id, {
                id: socket.id,
                userId: userId || socket.id,
                socketId: socket.id
            });
            
            // Send updated users list to all clients
            io.emit('users-list', Array.from(connectedUsers.values()));
            console.log('User registered:', userId || socket.id);
        });

        // Handle call initiation
        socket.on('call-user', ({ to, signal, from }) => {
            console.log('Call initiated from', from, 'to', to);
            socket.to(to).emit('incoming-call', {
                from: socket.id,
                signal
            });
        });

        // Handle call acceptance
        socket.on('accept-call', ({ to, signal }) => {
            console.log('Call accepted, sending signal to', to);
            socket.to(to).emit('call-accepted', { signal });
        });

        // Handle call rejection
        socket.on('reject-call', ({ to }) => {
            console.log('Call rejected');
            socket.to(to).emit('call-rejected');
        });

        // Handle call end
        socket.on('end-call', ({ to }) => {
            console.log('Call ended');
            if (to) {
                socket.to(to).emit('call-ended');
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            connectedUsers.delete(socket.id);
            
            // Send updated users list to all clients
            io.emit('users-list', Array.from(connectedUsers.values()));
        });
    });
};

module.exports = handleVoiceCall;