import NodeMediaServer = require("node-media-server");

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
    allow_origin: '*'
  }
};

const nms = new NodeMediaServer(config);

nms.on("doneConnect", () => {
  console.log("finished");
});

nms.on("postConnect", () => {
  console.log("streaming");
});

nms.run();