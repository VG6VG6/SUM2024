import http from"node:http"
//import fs from"node:fs/promises"
import process from "node:process"
import express, { json } from "express"
import { WebSocketServer } from "ws"
import { url } from "node:inspector";
import { type } from "node:os";

let messageArray = [];
let lastMessage;

const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({server});

let globalChatHTML = "";

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      if (String(message).startsWith(`{"type":"message"`)) {
        let myJson = JSON.parse(String(message));
        addToList(myJson);
        updateLastMessage(myJson);
        for (let elem of wss.clients)
          elem.send(JSON.stringify(lastMessage));
      }
    } catch {}
    try {
      if (String(message).startsWith(`{"type":"status"`)) {
        for (let elem of wss.clients)
          elem.send(String(message));
      }
    } catch {}
    try {
      if (String(message).startsWith(`{"type":"request"`)) {
          ws.send(JSON.stringify({"type": "answer", "answer": "None"}));
      }
    } catch {}
  });
  console.log("New client connected");
  if (messageArray.length > 0) {
    ws.send(JSON.stringify(messageArray));
  }
})

function addToList(Json) {
  messageArray.push({"user": Json.user, "text": Json.text, "logo": Json.logo});
}

function updateLastMessage(Json) {
  lastMessage = {"user": Json.user, "text": Json.text, "logo": Json.logo};
}

app.use(express.static("./"));

const host = "localhost";
const port = 8000;

server.listen(port, host, () => {
  console.log(`Server init in http://${host}:${port}`);
})

