// 📁 meet --> servidor para las reuniones

import { Server } from "socket.io";
import { mediasoup } from "mediasoup";


const io = new Server(server);

io.on("User connect", (socket) => {
  console.log("Usuario conectado");

  socket.on("signal", (data) => {
    socket.to(data.to).emit("signal", {
      from: socket.id,
      signal: data.signal,
    });
  });

  socket.on("join", (room) => {
    socket.join(room);
    socket.to(room).emit("New User", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

const localStream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});
document.getElementById("localVideo").srcObject = localStream;
