import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';

interface RoomState {
    currentTrack: string;
    currentTime: number;
    isPlaying: boolean;
}

const roomsState: Record<string, RoomState> = {};

export const initializeWebSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket: Socket) => {
        console.log("connected client");

        socket.on('subscribe', (room) => {
            console.log(`Room subscribed: ${room}`);
            socket.join(room);
            if (roomsState[room]) {
                socket.emit('trackChanged', roomsState[room].currentTrack);
                if (roomsState[room].isPlaying) {
                    socket.emit('playsong', roomsState[room].currentTime);
                }
            }
        });

        socket.on('unsubscribe', (room) => {
            console.log(`Room unsubscribed: ${room}`);
            socket.leave(room);
        });

        socket.on("disconnect", () => {
            console.log("Client Disconnected");
        });

        socket.on('changeTrack', (data) => {
            console.log(`Changing track to: ${data.track} in room: ${data.room}`);
            roomsState[data.room] = {
                ...roomsState[data.room],
                currentTrack: data.track,
                currentTime: 0,
                isPlaying: true,
            };
            io.to(data.room).emit('trackChanged', data.track);
            // Start playing immediately when the track is changed
            io.to(data.room).emit('playsong', roomsState[data.room].currentTime);
        });

        socket.on("play", (data) => {
            const roomState = roomsState[data.room];
            if (roomState) {
                roomState.isPlaying = true;
                roomState.currentTime = data.times;
                io.to(data.room).emit('playsong', data.times);
            }
        });

        socket.on("pause", (data) => {
            const roomState = roomsState[data.room];
            if (roomState) {
                roomState.isPlaying = false;
                roomState.currentTime = data.times;
                io.to(data.room).emit('pausesong', data.times);
            }
        });

    });

    return io;
};
