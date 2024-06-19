import http from"node:http"
import process from "node:process"
import express, { json } from "express"
import { WebSocketServer } from "ws"
import { url } from "node:inspector";
import { type } from "node:os";
import { MongoClient, ObjectId } from "mongodb";

let messageArray = [];
let lastMessage;

let messages;
let users;

async function main() {
  // Connectiong to database
  const dburl = "mongodb://localhost:27017/"
  const client = new MongoClient(dburl);

  const connection = await client.connect();
  const database = "3DchatDB";
  const db = connection.db(database);
  users = db.collection("Users");
  messages = db.collection("Messages");

  // Server initialization
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({server});

  app.use(express.static("client"));
  const host = "localhost";
  const port = 8000;
  server.listen(port, host, () => {
    console.log(`Server init in http://${host}:${port}`);
  })

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      try {
        let js = JSON.parse(message.toString());
        if (js.type == "enter") {
          let ans = await users.find({name: js.value}).toArray();

          if (ans.length == 0) {
            if (js.value != "")
              users.insertOne({name: js.value});
            else
              return
          }
          ws.send(JSON.stringify({type: "enter", value: js.value}));

        }
      } catch {}
    })
  })
}

main();