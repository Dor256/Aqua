import NodeMediaServer = require("node-media-server");
import * as socketServer from "socket.io";

const SOCKET_PORT = 7000;

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: "*"
  }
};

const nms = new NodeMediaServer(config);

const server = socketServer(SOCKET_PORT);
server.sockets.on("connection", (socket) => {
  nms.on("postPublish", () => {
    socket.emit("stream", true);
  });

  nms.on("doneConnect", () => {
    socket.emit("done", false);
  })
});

nms.run();

